<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HardwareAsset extends Model
{
    use HasFactory;
    protected $fillable = [
        'uuid',
        'tipo',
        'marca',
        'modelo',
        'numero_serie',
        'estado',
        'area_id',
        'descripcion',
        'fecha_adquisicion',
        'garantia_hasta',
        'requiere_mantenimiento',
    ];

    protected $casts = [
        'requiere_mantenimiento' => 'boolean',
        'fecha_adquisicion' => 'date',
        'garantia_hasta' => 'date',
    ];

    /**
     * Scope a query to filter by hardware type.
     */
    public function scopeByType($query, $type)
    {
        if (empty($type)) {
            return $query;
        }

        return $query->where('tipo', $type);
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeByStatus($query, $status)
    {
        if (empty($status)) {
            return $query;
        }

        return $query->where('estado', $status);
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function pcDetail()
    {
        return $this->hasOne(PcDetail::class, 'asset_id');
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }
}
