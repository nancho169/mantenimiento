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
        Schema::create('pc_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->unique()->constrained('hardware_assets')->onDelete('cascade');
            $table->string('cpu');
            $table->string('ram_gb');
            $table->string('almacenamiento');
            $table->string('mac_address');
            $table->string('anydesk_id')->nullable();
            $table->string('teamviewer_id')->nullable();
            $table->string('sistema_operativo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pc_details');
    }
};
