<?php

namespace Database\Factories;

use App\Models\Area;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HardwareAsset>
 */
class HardwareAssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipos = ['PC', 'Impresora', 'Monitor', 'Periférico', 'Servidor', 'Laptop', 'Router', 'Telefono', 'Escáner', 'Tablet'];
        $marcas = ['Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'Samsung', 'LG', 'Cisco', 'Epson', 'Canon'];
        $estados = ['Operativo', 'En Reparación', 'Baja', 'En Mantenimiento', 'Dañado', 'Reservado'];

        return [
            'uuid' => (string) Str::uuid(),
            'tipo' => fake()->randomElement($tipos),
            'marca' => fake()->randomElement($marcas),
            'modelo' => fake()->bothify('??-####'),
            'numero_serie' => fake()->unique()->bothify('SN-########'),
            'estado' => fake()->randomElement($estados),
            'area_id' => Area::factory(),
            'descripcion' => fake()->optional()->sentence(),
            'fecha_adquisicion' => fake()->optional()->dateTimeBetween('-5 years', 'now'),
            'garantia_hasta' => fake()->optional()->dateTimeBetween('now', '+3 years'),
            'requiere_mantenimiento' => fake()->boolean(30),
        ];
    }
}
