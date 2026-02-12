<?php

use App\Models\Area;
use App\Models\HardwareAsset;
use App\Models\PcDetail;
use App\Models\User;

test('can export pc details to csv', function () {
    $user = User::factory()->create();
    
    $area = Area::factory()->create(['nombre' => 'IT Department']);
    $asset = HardwareAsset::factory()->create([
        'tipo' => 'PC',
        'marca' => 'Dell',
        'modelo' => 'OptiPlex 7090',
        'numero_serie' => 'SN123456',
        'estado' => 'Operativo',
        'area_id' => $area->id,
    ]);
    
    PcDetail::factory()->create([
        'asset_id' => $asset->id,
        'cpu' => 'Intel i7',
        'ram_gb' => 16,
        'almacenamiento' => '512GB SSD',
        'sistema_operativo' => 'Windows 11',
        'ip_address' => '192.168.1.100',
        'mac_address' => '00:11:22:33:44:55',
    ]);

    $response = $this->actingAs($user)->get(route('pc-details.export'));

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'text/csv');
    expect($response->headers->get('Content-Disposition'))->toContain('inventario_pc_');
});

test('exported csv contains correct data', function () {
    $user = User::factory()->create();
    
    $area = Area::factory()->create(['nombre' => 'Sales']);
    $asset = HardwareAsset::factory()->create([
        'tipo' => 'Laptop',
        'marca' => 'HP',
        'modelo' => 'ProBook 450',
        'numero_serie' => 'HP789',
        'area_id' => $area->id,
    ]);
    
    PcDetail::factory()->create([
        'asset_id' => $asset->id,
        'cpu' => 'Intel i5',
        'ram_gb' => 8,
        'ip_address' => '192.168.1.50',
    ]);

    $response = $this->actingAs($user)->get(route('pc-details.export'));

    $content = $response->streamedContent();
    
    expect($content)->toContain('HP');
    expect($content)->toContain('ProBook 450');
    expect($content)->toContain('Intel i5');
    expect($content)->toContain('192.168.1.50');
});

test('can generate pc report', function () {
    $user = User::factory()->create();
    
    $asset = HardwareAsset::factory()->create(['tipo' => 'PC']);
    PcDetail::factory()->create(['asset_id' => $asset->id]);

    $response = $this->actingAs($user)->get(route('pc-details.report'));

    $response->assertStatus(200);
});

test('can create pc detail with ip address', function () {
    $user = User::factory()->create();
    $asset = HardwareAsset::factory()->create(['tipo' => 'PC']);

    $data = [
        'asset_id' => $asset->id,
        'cpu' => 'AMD Ryzen 5',
        'ram_gb' => 16,
        'almacenamiento' => '1TB SSD',
        'sistema_operativo' => 'Ubuntu 22.04',
        'ip_address' => '192.168.1.200',
        'mac_address' => 'AA:BB:CC:DD:EE:FF',
    ];

    $response = $this->actingAs($user)->post(route('pc-details.store'), $data);

    $response->assertRedirect(route('pc-details.index'));
    $this->assertDatabaseHas('pc_details', [
        'ip_address' => '192.168.1.200',
        'cpu' => 'AMD Ryzen 5',
    ]);
});
