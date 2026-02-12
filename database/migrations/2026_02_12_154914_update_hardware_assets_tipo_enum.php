<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // MySQL no permite modificar ENUM directamente, necesitamos usar ALTER TABLE
        DB::statement("ALTER TABLE hardware_assets MODIFY COLUMN tipo ENUM('PC', 'Laptop', 'Servidor', 'Impresora', 'Scanner', 'Monitor', 'Proyector', 'Switch', 'Router', 'Firewall', 'UPS', 'Otro') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No revertir el ENUM para evitar pérdida de datos
        // Si necesitas revertir, primero actualiza los registros con tipos no compatibles
        // DB::statement("ALTER TABLE hardware_assets MODIFY COLUMN tipo ENUM('PC', 'Impresora') NOT NULL");
    }
};
