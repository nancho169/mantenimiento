<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hardware_assets', function (Blueprint $table) {
            $table->text('descripcion')->nullable();
            $table->date('fecha_adquisicion')->nullable();
            $table->date('garantia_hasta')->nullable();
            $table->boolean('requiere_mantenimiento')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hardware_assets', function (Blueprint $table) {
            $table->dropColumn(['descripcion', 'fecha_adquisicion', 'garantia_hasta', 'requiere_mantenimiento']);
        });
    }
};
