<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $areasJson = file_get_contents(base_path('areas_data.json'));
        $areas = json_decode($areasJson, true);

        foreach ($areas as $area) {
            Area::create($area);
        }
    }
}
