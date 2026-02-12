<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    protected $fillable = [
        'asset_id',
        'filename',
        'original_name',
        'mime_type',
        'size',
        'path',
        'uploaded_by',
    ];

    /**
     * Get the hardware asset that owns the document.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(HardwareAsset::class, 'asset_id');
    }

    /**
     * Get the user who uploaded the document.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the full path to the document.
     */
    public function getFullPathAttribute(): string
    {
        return storage_path('app/' . $this->path);
    }

    /**
     * Get human-readable file size.
     */
    public function getFormattedSizeAttribute(): string
    {
        $bytes = $this->size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
}
