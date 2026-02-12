<?php

namespace App\Http\Controllers;

use App\Models\HardwareAsset;
use App\Models\Maintenance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreMaintenanceRequest;
use App\Http\Requests\UpdateMaintenanceRequest;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maintenances = Maintenance::with('hardwareAsset')->latest('fecha_servicio')->get();
        return Inertia::render('maintenances/index', [
            'maintenances' => $maintenances
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $assets = HardwareAsset::select('id', 'tipo', 'marca', 'modelo', 'numero_serie')
            ->orderBy('marca')
            ->get();

        return Inertia::render('maintenances/create', [
            'assets' => $assets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaintenanceRequest $request)
    {
        Maintenance::create($request->validated());

        return redirect()->route('maintenances.index')->with('success', 'Mantenimiento registrado correctamente.');
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
    public function edit(Maintenance $maintenance)
    {
        $assets = HardwareAsset::select('id', 'tipo', 'marca', 'modelo', 'numero_serie')
            ->orderBy('marca')
            ->get();

        return Inertia::render('maintenances/edit', [
            'maintenance' => $maintenance,
            'assets' => $assets
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenanceRequest $request, Maintenance $maintenance)
    {
        $maintenance->update($request->validated());

        return redirect()->route('maintenances.index')->with('success', 'Mantenimiento actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();
        return redirect()->route('maintenances.index')->with('success', 'Mantenimiento eliminado correctamente.');
    }
}
