<?php

use App\Models\Area;

test('area has fillable attributes', function () {
    $area = new Area([
        'nombre' => 'Test Area',
        'ubicacion_fisica' => 'Test Location',
        'latitud' => -34.0,
        'longitud' => -58.0,
    ]);

    expect($area->nombre)->toBe('Test Area');
    expect($area->ubicacion_fisica)->toBe('Test Location');
    expect($area->latitud)->toBe(-34.0);
    expect($area->longitud)->toBe(-58.0);
});

test('search scope returns all areas when search is empty', function () {
    Area::factory()->count(3)->create();

    $results = Area::search('')->get();

    expect($results)->toHaveCount(3);
});

test('search scope filters by nombre', function () {
    Area::factory()->create(['nombre' => 'Oficina Principal']);
    Area::factory()->create(['nombre' => 'Almacén']);
    Area::factory()->create(['nombre' => 'Oficina Secundaria']);

    $results = Area::search('Oficina')->get();

    expect($results)->toHaveCount(2);
});

test('search scope filters by ubicacion_fisica', function () {
    Area::factory()->create(['ubicacion_fisica' => 'Edificio A']);
    Area::factory()->create(['ubicacion_fisica' => 'Edificio B']);
    Area::factory()->create(['ubicacion_fisica' => 'Almacén A']);

    $results = Area::search('Edificio')->get();

    expect($results)->toHaveCount(2);
});

test('search scope is case insensitive', function () {
    Area::factory()->create(['nombre' => 'OFICINA']);
    Area::factory()->create(['nombre' => 'oficina']);

    $results = Area::search('oficina')->get();

    expect($results)->toHaveCount(2);
});

test('area has hardware assets relationship', function () {
    $area = Area::factory()->create();

    expect($area->hardwareAssets())->toBeInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class);
});
