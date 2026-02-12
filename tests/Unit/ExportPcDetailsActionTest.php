<?php

use App\Actions\ExportPcDetailsAction;
use App\Models\Area;
use App\Models\HardwareAsset;
use App\Models\PcDetail;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('export action returns csv response', function () {
    $action = new ExportPcDetailsAction();
    
    $area = Area::factory()->create();
    $asset = HardwareAsset::factory()->create(['area_id' => $area->id]);
    PcDetail::factory()->create(['asset_id' => $asset->id]);

    $response = $action->execute();

    expect($response)->toBeInstanceOf(\Illuminate\Http\Response::class);
    expect($response->headers->get('Content-Type'))->toBe('text/csv');
});

test('export includes all pc details', function () {
    $action = new ExportPcDetailsAction();
    
    $area = Area::factory()->create(['nombre' => 'TestArea']);
    $asset1 = HardwareAsset::factory()->create([
        'marca' => 'Dell',
        'modelo' => 'XPS',
        'area_id' => $area->id,
    ]);
    $asset2 = HardwareAsset::factory()->create([
        'marca' => 'HP',
        'modelo' => 'EliteBook',
        'area_id' => $area->id,
    ]);
    
    PcDetail::factory()->create(['asset_id' => $asset1->id, 'cpu' => 'Intel i7']);
    PcDetail::factory()->create(['asset_id' => $asset2->id, 'cpu' => 'Intel i5']);

    $response = $action->execute();
    $content = $response->streamedContent();

    expect($content)->toContain('Dell');
    expect($content)->toContain('HP');
    expect($content)->toContain('Intel i7');
    expect($content)->toContain('Intel i5');
});

test('export includes ip address field', function () {
    $action = new ExportPcDetailsAction();
    
    $asset = HardwareAsset::factory()->create();
    PcDetail::factory()->create([
        'asset_id' => $asset->id,
        'ip_address' => '10.0.0.1',
    ]);

    $response = $action->execute();
    $content = $response->streamedContent();

    expect($content)->toContain('10.0.0.1');
});

test('export handles null ip address', function () {
    $action = new ExportPcDetailsAction();
    
    $asset = HardwareAsset::factory()->create();
    PcDetail::factory()->create([
        'asset_id' => $asset->id,
        'ip_address' => null,
    ]);

    $response = $action->execute();

    expect($response->getStatusCode())->toBe(200);
});

test('export filename contains current date', function () {
    $action = new ExportPcDetailsAction();
    
    $response = $action->execute();
    $disposition = $response->headers->get('Content-Disposition');
    $expectedDate = date('Y-m-d');

    expect($disposition)->toContain("inventario_pc_{$expectedDate}");
});

