<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Area>
 */
class AreaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->company() . ' - ' . fake()->randomElement(['Oficina', 'Almacén', 'Sala', 'Departamento']),
            'ubicacion_fisica' => fake()->randomElement(['Piso 1', 'Piso 2', 'Piso 3', 'Planta Baja']) . ', ' . fake()->randomElement(['Edificio A', 'Edificio B', 'Torre Norte']),
            'latitud' => fake()->latitude(-35, -33),
            'longitud' => fake()->longitude(-59, -57),
        ];
    }
}
