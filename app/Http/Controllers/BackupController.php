<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;

class BackupController extends Controller
{
    public function download()
    {
        try {
            // Increase execution time for large backups
            set_time_limit(0);
            
            // Get database credentials from config (Safer than env() in production)
            $dbConnection = config('database.default');
            $dbHost = config("database.connections.{$dbConnection}.host", '127.0.0.1');
            $dbPort = config("database.connections.{$dbConnection}.port", '3306');
            $dbName = config("database.connections.{$dbConnection}.database");
            $dbUser = config("database.connections.{$dbConnection}.username");
            $dbPassword = config("database.connections.{$dbConnection}.password");

            // Generate filename with timestamp
            $timestamp = date('Y-m-d_H-i-s');
            $filename = "backup_{$timestamp}.sql";
            $filepath = storage_path("app/{$filename}");

            \Log::info("Starting PHP-based backup for database: {$dbName}");

            // Try mysqldump first (if available)
            $mysqldumpPath = $this->findMysqldump();
            
            if ($mysqldumpPath) {
                \Log::info("Using mysqldump at: {$mysqldumpPath}");
                try {
                    return $this->backupWithMysqldump($mysqldumpPath, $dbHost, $dbPort, $dbUser, $dbPassword, $dbName, $filepath, $filename);
                } catch (\Exception $e) {
                    \Log::warning("mysqldump failed: " . $e->getMessage() . ". Falling back to PHP-based backup.");
                }
            }

            // Fallback to PHP-based backup
            \Log::info("Using PHP-based backup");
            return $this->backupWithPHP($dbName, $filepath, $filename);

        } catch (\Exception $e) {
            \Log::error('Backup error: ' . $e->getMessage());
            return redirect()->route('dashboard')->with('errorMessage', 'Error al generar el backup: ' . $e->getMessage());
        }
    }

    private function findMysqldump()
    {
        $mysqldumpPaths = [
            'mysqldump',
            'C:\\xampp\\mysql\\bin\\mysqldump.exe',
            'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe',
            'C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqldump.exe',
            'C:\\wamp64\\bin\\mysql\\mysql8.0.27\\bin\\mysqldump.exe',
        ];

        foreach ($mysqldumpPaths as $path) {
            if ($path === 'mysqldump') {
                exec('where mysqldump 2>&1', $whereOutput, $whereReturn);
                if ($whereReturn === 0 && !empty($whereOutput)) {
                    return 'mysqldump';
                }
            } elseif (file_exists($path)) {
                return $path;
            }
        }

        return null;
    }

    private function backupWithMysqldump($mysqldumpPath, $dbHost, $dbPort, $dbUser, $dbPassword, $dbName, $filepath, $filename)
    {
        // Ensure directory exists and is writable
        $dir = dirname($filepath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        
        if (!is_writable($dir)) {
            throw new \Exception("La carpeta de almacenamiento no tiene permisos de escritura: {$dir}");
        }

        $command = sprintf(
            '"%s" --host=%s --port=%s --user=%s',
            $mysqldumpPath,
            escapeshellarg($dbHost),
            escapeshellarg($dbPort),
            escapeshellarg($dbUser)
        );

        if (!empty($dbPassword)) {
            // Note: --password=PASSWORD without space. escapeshellarg handles quoting on Windows.
            $command .= ' --password=' . escapeshellarg($dbPassword);
        }

        $command .= sprintf(' %s > "%s" 2>&1', escapeshellarg($dbName), $filepath);

        \Log::info("Executing: " . str_replace($dbPassword, '****', $command));

        exec($command, $output, $returnCode);

        if ($returnCode !== 0) {
            $errorMessage = !empty($output) ? implode("\n", $output) : 'mysqldump falló';
            throw new \Exception("Error con mysqldump: {$errorMessage}");
        }

        if (!file_exists($filepath) || filesize($filepath) === 0) {
            throw new \Exception('El archivo de backup está vacío.');
        }

        return Response::download($filepath, $filename, [
            'Content-Type' => 'application/sql',
        ])->deleteFileAfterSend(true);
    }

    private function backupWithPHP($dbName, $filepath, $filename)
    {
        $handle = fopen($filepath, 'w');
        if (!$handle) {
            throw new \Exception('Error al crear el archivo de backup.');
        }

        fwrite($handle, "-- MySQL Backup\n");
        fwrite($handle, "-- Generated: " . date('Y-m-d H:i:s') . "\n");
        fwrite($handle, "-- Database: {$dbName}\n\n");
        fwrite($handle, "SET FOREIGN_KEY_CHECKS=0;\n\n");

        // Get all tables
        $tables = DB::select('SHOW TABLES');
        $tableKey = "Tables_in_{$dbName}";

        foreach ($tables as $table) {
            $tableName = $table->$tableKey;
            \Log::info("Backing up table: {$tableName}");

            // Drop table statement
            fwrite($handle, "-- Table: {$tableName}\n");
            fwrite($handle, "DROP TABLE IF EXISTS `{$tableName}`;\n");

            // Create table statement
            try {
                $createTable = DB::select("SHOW CREATE TABLE `{$tableName}`");
                $createTableArray = (array)$createTable[0];
                $createSql = array_values($createTableArray)[1] ?? null;
                
                if ($createSql) {
                    fwrite($handle, $createSql . ";\n\n");
                } else {
                    fwrite($handle, "-- Could not get create statement for {$tableName}\n\n");
                }
            } catch (\Exception $e) {
                \Log::warning("Could not get create statement for {$tableName}: " . $e->getMessage());
                fwrite($handle, "-- Error getting create statement for {$tableName}: " . $e->getMessage() . "\n\n");
                continue;
            }

            // Get table data
            try {
                fwrite($handle, "-- Data for table: {$tableName}\n");
                
                foreach (DB::table($tableName)->cursor() as $row) {
                    $values = [];
                    foreach ((array)$row as $value) {
                        if (is_null($value)) {
                            $values[] = 'NULL';
                        } else {
                            $values[] = "'" . addslashes((string)$value) . "'";
                        }
                    }
                    fwrite($handle, "INSERT INTO `{$tableName}` VALUES (" . implode(', ', $values) . ");\n");
                }
                
                fwrite($handle, "\n");
            } catch (\Exception $e) {
                \Log::warning("Could not read table {$tableName}: " . $e->getMessage());
                fwrite($handle, "-- Error reading table data for {$tableName}: " . $e->getMessage() . "\n\n");
            }
        }

        fwrite($handle, "SET FOREIGN_KEY_CHECKS=1;\n");
        fclose($handle);

        \Log::info("Backup created: {$filepath} (" . filesize($filepath) . " bytes)");

        if (!file_exists($filepath) || filesize($filepath) === 0) {
            throw new \Exception('Error al crear el archivo de backup.');
        }

        return Response::download($filepath, $filename, [
            'Content-Type' => 'application/sql',
        ])->deleteFileAfterSend(true);
    }
}
