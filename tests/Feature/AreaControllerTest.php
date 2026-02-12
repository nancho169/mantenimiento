<?php

use App\Models\Area;
use App\Models\User;

test('can list areas', function () {
    $user = User::factory()->create();
    Area::factory()->count(3)->create();

    $response = $this->actingAs($user)->get(route('areas.index'));

    $response->assertStatus(200);
});

test('can create area with valid data', function () {
    $user = User::factory()->create();

    $data = [
        'nombre' => 'Oficina Principal',
        'ubicacion_fisica' => 'Piso 1, Edificio A',
        'latitud' => -34.603722,
        'longitud' => -58.381592,
    ];

    $response = $this->actingAs($user)->post(route('areas.store'), $data);

    $response->assertRedirect(route('areas.index'));
    $this->assertDatabaseHas('areas', ['nombre' => 'Oficina Principal']);
});

test('cannot create area with invalid data', function () {
    $user = User::factory()->create();

    $data = [
        'nombre' => '', // Required field empty
        'ubicacion_fisica' => 'Piso 1',
    ];

    $response = $this->actingAs($user)->post(route('areas.store'), $data);

    $response->assertSessionHasErrors(['nombre']);
});

test('can update area', function () {
    $user = User::factory()->create();
    $area = Area::factory()->create(['nombre' => 'Original']);

    $data = [
        'nombre' => 'Actualizado',
        'ubicacion_fisica' => 'Nueva ubicación',
    ];

    $response = $this->actingAs($user)->put(route('areas.update', $area), $data);

    $response->assertRedirect(route('areas.index'));
    $this->assertDatabaseHas('areas', ['nombre' => 'Actualizado']);
});

test('can delete area', function () {
    $user = User::factory()->create();
    $area = Area::factory()->create();

    $response = $this->actingAs($user)->delete(route('areas.destroy', $area));

    $response->assertRedirect(route('areas.index'));
    $this->assertDatabaseMissing('areas', ['id' => $area->id]);
});

test('search scope filters areas correctly', function () {
    Area::factory()->create(['nombre' => 'Oficina Central']);
    Area::factory()->create(['nombre' => 'Almacén']);
    Area::factory()->create(['ubicacion_fisica' => 'Edificio Central']);

    $results = Area::search('Central')->get();

    expect($results)->toHaveCount(2);
});
