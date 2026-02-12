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
        Schema::create('hardware_assets', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->enum('tipo', ['PC', 'Impresora']);
            $table->string('marca');
            $table->string('modelo');
            $table->string('numero_serie');
            $table->string('estado');
            $table->foreignId('area_id')->constrained('areas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hardware_assets');
    }
};
