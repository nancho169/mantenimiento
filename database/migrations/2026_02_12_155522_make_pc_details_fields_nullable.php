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
        // Hacer que mac_address, ip_address y otros campos sean opcionales
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN mac_address VARCHAR(255) NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN ip_address VARCHAR(255) NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN cpu VARCHAR(255) NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN ram_gb VARCHAR(255) NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN almacenamiento VARCHAR(255) NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN sistema_operativo VARCHAR(255) NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No revertir a NOT NULL para evitar errores con datos existentes que tienen NULL
        // Si necesitas revertir, primero actualiza los registros con valores NULL
        /*
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN mac_address VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN ip_address VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN cpu VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN ram_gb VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN almacenamiento VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE pc_details MODIFY COLUMN sistema_operativo VARCHAR(255) NOT NULL');
        */
    }
};
