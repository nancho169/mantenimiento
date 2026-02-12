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
            if (Schema::hasColumn('hardware_assets', 'descripcion')) {
                $table->dropColumn('descripcion');
            }
            if (Schema::hasColumn('hardware_assets', 'fecha_adquisicion')) {
                $table->dropColumn('fecha_adquisicion');
            }
            if (Schema::hasColumn('hardware_assets', 'garantia_hasta')) {
                $table->dropColumn('garantia_hasta');
            }
            if (Schema::hasColumn('hardware_assets', 'requiere_mantenimiento')) {
                $table->dropColumn('requiere_mantenimiento');
            }
        });
    }
};
