<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Color::query()->insert(
            [
                [
                    "name" => "red",
                    "code" => "#B90000"
                ],
                [
                    "name" => "blue",
                    "code" => "#0079FF"
                ],
                [
                    "name" => "green",
                    "code" => "#1B9C85"
                ],
                [
                    "name" => "black",
                    "code" => "#000000"
                ],
                [
                    "name" => "pink",
                    "code" => "#FFAAC9"
                ],
                [
                    "name" => "white",
                    "code" => "#111111"
                ],
                [
                    "name" => "orange",
                    "code" => "#FC4F00"
                ]
            ]
        );
    }
}
