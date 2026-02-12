<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\HardwareAsset;
use App\Models\Maintenance;
use App\Models\PcDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // KPIs
        $totalAssets = HardwareAsset::count();
        $operationalAssets = HardwareAsset::where('estado', 'Operativo')->count();
        $assetsInRepair = HardwareAsset::where('estado', 'En Reparación')->count();
        $totalMaintenances = Maintenance::count();
        $totalAreas = Area::count();

        // Hardware status distribution
        $hardwareByStatus = HardwareAsset::selectRaw('estado, COUNT(*) as count')
            ->groupBy('estado')
            ->get()
            ->mapWithKeys(fn($item) => [$item->estado => $item->count]);

        // Assets by area
        $assetsByArea = HardwareAsset::with('area:id,nombre')
            ->get()
            ->groupBy('area.nombre')
            ->map(fn($items) => $items->count())
            ->take(10);

        // Maintenances by month (last 6 months) - using correct column name
        $maintenancesByMonth = Maintenance::selectRaw('DATE_FORMAT(fecha_servicio, "%Y-%m") as month, COUNT(*) as count')
            ->where('fecha_servicio', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->mapWithKeys(fn($item) => [$item->month => $item->count]);

        // Recent maintenances - simplified without tipo_mantenimiento and area
        $recentMaintenances = Maintenance::with(['hardwareAsset:id,marca,modelo,area_id', 'hardwareAsset.area:id,nombre'])
            ->orderBy('fecha_servicio', 'desc')
            ->take(5)
            ->get();

        // PC Details stats
        $totalPcDetails = PcDetail::count();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalAssets' => $totalAssets,
                'operationalAssets' => $operationalAssets,
                'assetsInRepair' => $assetsInRepair,
                'totalMaintenances' => $totalMaintenances,
                'totalAreas' => $totalAreas,
                'totalPcDetails' => $totalPcDetails,
                'operationalPercentage' => $totalAssets > 0 ? round(($operationalAssets / $totalAssets) * 100, 1) : 0,
            ],
            'charts' => [
                'hardwareByStatus' => $hardwareByStatus,
                'assetsByArea' => $assetsByArea,
                'maintenancesByMonth' => $maintenancesByMonth,
            ],
            'recentMaintenances' => $recentMaintenances,
        ]);
    }
}
