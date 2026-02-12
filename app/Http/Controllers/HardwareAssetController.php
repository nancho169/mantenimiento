<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\HardwareAsset;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Http\Requests\StoreHardwareAssetRequest;
use App\Http\Requests\UpdateHardwareAssetRequest;

class HardwareAssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assets = HardwareAsset::with('area')->latest()->get();
        return Inertia::render('hardware-assets/index', [
            'assets' => $assets
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = Area::all();
        return Inertia::render('hardware-assets/create', [
            'areas' => $areas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHardwareAssetRequest $request)
    {
        $validated = $request->validated();
        $validated['uuid'] = (string) Str::uuid();

        $asset = HardwareAsset::create($validated);

        return to_route('hardware-assets.show', $asset)->with('success', 'Activo creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(HardwareAsset $hardwareAsset)
    {
        $hardwareAsset->load(['area']);
        return Inertia::render('hardware-assets/show', [
            'asset' => $hardwareAsset
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HardwareAsset $hardwareAsset)
    {
        $areas = Area::all();
        return Inertia::render('hardware-assets/edit', [
            'asset' => $hardwareAsset,
            'areas' => $areas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHardwareAssetRequest $request, HardwareAsset $hardwareAsset)
    {
        $hardwareAsset->update($request->validated());

        return to_route('hardware-assets.show', $hardwareAsset)->with('success', 'Activo actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HardwareAsset $hardwareAsset)
    {
        $hardwareAsset->delete();
        return redirect()->route('hardware-assets.index')->with('success', 'Activo eliminado correctamente.');
    }
}
