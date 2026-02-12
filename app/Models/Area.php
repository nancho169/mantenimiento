<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\HardwareAsset;

class Area extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'ubicacion_fisica', 'latitud', 'longitud'];

    /**
     * Scope a query to search by nombre or ubicacion_fisica.
     */
    public function scopeSearch($query, $search)
    {
        if (empty($search)) {
            return $query;
        }

        return $query->where('nombre', 'like', "%{$search}%")
                     ->orWhere('ubicacion_fisica', 'like', "%{$search}%");
    }

    public function hardwareAssets()
    {
        return $this->hasMany(HardwareAsset::class);
    }
}
