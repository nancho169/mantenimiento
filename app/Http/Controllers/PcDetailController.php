<?php

namespace App\Http\Controllers;

use App\Models\HardwareAsset;
use App\Models\PcDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StorePcDetailRequest;
use App\Http\Requests\UpdatePcDetailRequest;
use App\Actions\ExportPcDetailsAction;
use App\Actions\GeneratePcReportAction;

class PcDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $details = PcDetail::with('hardwareAsset')->latest()->get();
        return Inertia::render('pc-details/index', [
            'details' => $details
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get assets that are PCs/Laptops/Servers AND don't have details yet
        // OR we can just list them and let validation handle it, but better UX to filter.
        // For now, let's just list compatible types.
        $assets = HardwareAsset::whereIn('tipo', ['PC', 'Laptop', 'Servidor', 'All-in-One'])
            ->whereDoesntHave('pcDetail')
            ->select('id', 'tipo', 'marca', 'modelo', 'numero_serie')
            ->orderBy('marca')
            ->get();

        return Inertia::render('pc-details/create', [
            'assets' => $assets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePcDetailRequest $request)
    {
        PcDetail::create($request->validated());

        return to_route('pc-details.index')->with('success', 'Detalles de PC guardados correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PcDetail $pcDetail)
    {
        // For editing, we need the current asset PLUS others available
        // BUT changing the asset of a detail is rare. Let's allowing it but carefully.
        // Actually, usually you edit the SPECS of the asset.
        
        $pcDetail->load('hardwareAsset');

        return Inertia::render('pc-details/edit', [
            'detail' => $pcDetail,
            // If we want to allow changing the asset, we need the list again
            // 'assets' => ... 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePcDetailRequest $request, PcDetail $pcDetail)
    {
        $pcDetail->update($request->validated());

        return to_route('pc-details.index')->with('success', 'Detalles actualizados correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PcDetail $pcDetail)
    {
        $pcDetail->delete();
        return to_route('pc-details.index')->with('success', 'Detalles eliminados correctamente.');
    }
    public function export(ExportPcDetailsAction $action)
    {
        return $action->execute();
    }

    public function report(GeneratePcReportAction $action)
    {
        return Inertia::render('pc-details/report', $action->execute());
    }
}
