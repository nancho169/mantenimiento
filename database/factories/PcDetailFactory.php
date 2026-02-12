<?php

namespace Database\Factories;

use App\Models\HardwareAsset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PcDetail>
 */
class PcDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cpus = ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7'];
        $sistemas = ['Windows 10', 'Windows 11', 'Ubuntu 20.04', 'Ubuntu 22.04', 'macOS Monterey', 'macOS Ventura'];
        $almacenamientos = ['256GB SSD', '512GB SSD', '1TB SSD', '2TB HDD', '1TB HDD + 256GB SSD'];

        return [
            'asset_id' => HardwareAsset::factory(),
            'cpu' => fake()->randomElement($cpus),
            'ram_gb' => fake()->randomElement([4, 8, 16, 32, 64]),
            'almacenamiento' => fake()->randomElement($almacenamientos),
            'sistema_operativo' => fake()->randomElement($sistemas),
            'mac_address' => fake()->macAddress(),
            'ip_address' => fake()->optional()->localIpv4(),
            'anydesk_id' => fake()->optional()->numerify('########'),
            'teamviewer_id' => fake()->optional()->numerify('### ### ###'),
        ];
    }
}
