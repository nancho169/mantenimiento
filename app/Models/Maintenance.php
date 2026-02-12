<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Maintenance extends Model
{
    use HasFactory;
    protected $fillable = [
        'asset_id',
        'fecha_servicio',
        'tecnico',
        'descripcion',
        'proximo_mantenimiento',
    ];

    protected $casts = [
        'fecha_servicio' => 'date',
        'proximo_mantenimiento' => 'date',
    ];

    public function hardwareAsset()
    {
        return $this->belongsTo(HardwareAsset::class, 'asset_id');
    }
}
