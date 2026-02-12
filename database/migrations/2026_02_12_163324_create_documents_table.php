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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained('hardware_assets')->onDelete('cascade');
            $table->string('filename'); // Nombre del archivo en el sistema
            $table->string('original_name'); // Nombre original del archivo
            $table->string('mime_type');
            $table->integer('size'); // Tamaño en bytes
            $table->string('path'); // Ruta relativa del archivo
            $table->foreignId('uploaded_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
