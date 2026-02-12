<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\HardwareAsset;

class PcDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'asset_id',
        'cpu',
        'ram_gb',
        'almacenamiento',
        'mac_address',
        'ip_address',
        'anydesk_id',
        'teamviewer_id',
        'sistema_operativo',
    ];

    public function hardwareAsset()
    {
        return $this->belongsTo(HardwareAsset::class, 'asset_id');
    }
}
