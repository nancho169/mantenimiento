<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\HardwareAssetController;
use App\Http\Controllers\PcDetailController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::resource('areas', AreaController::class);
    Route::resource('hardware-assets', HardwareAssetController::class);
    Route::get('pc-details/export', [PcDetailController::class, 'export'])->name('pc-details.export');
    Route::get('pc-details/report', [PcDetailController::class, 'report'])->name('pc-details.report');
    Route::resource('pc-details', PcDetailController::class);
    Route::resource('maintenances', MaintenanceController::class);
    
    // Document routes
    Route::post('hardware-assets/{asset}/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
    Route::delete('documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
});

require __DIR__.'/settings.php';
