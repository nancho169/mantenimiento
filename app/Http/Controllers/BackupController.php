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
            // Get database credentials from .env
            $dbHost = env('DB_HOST', '127.0.0.1');
            $dbPort = env('DB_PORT', '3306');
            $dbName = env('DB_DATABASE');
            $dbUser = env('DB_USERNAME');
            $dbPassword = env('DB_PASSWORD');

            // Generate filename with timestamp
            $timestamp = date('Y-m-d_H-i-s');
            $filename = "backup_{$timestamp}.sql";
            $filepath = storage_path("app/{$filename}");

            \Log::info("Starting PHP-based backup for database: {$dbName}");

            // Try mysqldump first (if available)
            $mysqldumpPath = $this->findMysqldump();
            
            if ($mysqldumpPath) {
                \Log::info("Using mysqldump at: {$mysqldumpPath}");
                return $this->backupWithMysqldump($mysqldumpPath, $dbHost, $dbPort, $dbUser, $dbPassword, $dbName, $filepath, $filename);
            }

            // Fallback to PHP-based backup
            \Log::info("mysqldump not found, using PHP-based backup");
            return $this->backupWithPHP($dbName, $filepath, $filename);

        } catch (\Exception $e) {
            \Log::error('Backup error: ' . $e->getMessage());
            return redirect()->route('dashboard')->with('error', 'Error al generar el backup: ' . $e->getMessage());
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
        $command = sprintf(
            '"%s" --host=%s --port=%s --user=%s',
            $mysqldumpPath,
            $dbHost,
            $dbPort,
            $dbUser
        );

        if (!empty($dbPassword)) {
            $command .= sprintf(' --password=%s', $dbPassword);
        }

        $command .= sprintf(' %s > "%s" 2>&1', $dbName, $filepath);

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
        $sql = "-- MySQL Backup\n";
        $sql .= "-- Generated: " . date('Y-m-d H:i:s') . "\n";
        $sql .= "-- Database: {$dbName}\n\n";
        $sql .= "SET FOREIGN_KEY_CHECKS=0;\n\n";

        // Get all tables
        $tables = DB::select('SHOW TABLES');
        $tableKey = "Tables_in_{$dbName}";

        foreach ($tables as $table) {
            $tableName = $table->$tableKey;
            \Log::info("Backing up table: {$tableName}");

            // Drop table statement
            $sql .= "-- Table: {$tableName}\n";
            $sql .= "DROP TABLE IF EXISTS `{$tableName}`;\n";

            // Create table statement
            $createTable = DB::select("SHOW CREATE TABLE `{$tableName}`");
            $sql .= $createTable[0]->{'Create Table'} . ";\n\n";

            // Get table data
            $rows = DB::table($tableName)->get();
            
            if ($rows->count() > 0) {
                $sql .= "-- Data for table: {$tableName}\n";
                
                foreach ($rows as $row) {
                    $values = [];
                    foreach ((array)$row as $value) {
                        if (is_null($value)) {
                            $values[] = 'NULL';
                        } else {
                            $values[] = "'" . addslashes($value) . "'";
                        }
                    }
                    $sql .= "INSERT INTO `{$tableName}` VALUES (" . implode(', ', $values) . ");\n";
                }
                $sql .= "\n";
            }
        }

        $sql .= "SET FOREIGN_KEY_CHECKS=1;\n";

        // Write to file
        file_put_contents($filepath, $sql);

        \Log::info("Backup created: {$filepath} (" . filesize($filepath) . " bytes)");

        if (!file_exists($filepath) || filesize($filepath) === 0) {
            throw new \Exception('Error al crear el archivo de backup.');
        }

        return Response::download($filepath, $filename, [
            'Content-Type' => 'application/sql',
        ])->deleteFileAfterSend(true);
    }
}
