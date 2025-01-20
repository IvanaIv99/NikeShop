<?php

namespace Database\Seeders;

use App\Models\Colors;
use App\Models\PaymentMethods;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PaymentMethods::query()->insert(
            [
                [
                    "name" => "Pay On Delivery",
                ],
                [
                    "name" => "Card",
                ],
                [
                    "name" => "Direct Bank Transfer",
                ]
            ]
        );
    }
}
