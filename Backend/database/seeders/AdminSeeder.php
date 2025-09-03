<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::query()->insert([
            [
                'first_name' => 'Ivana',
                'last_name' => 'Ivanovic',
                'email' => 'ivana@gmail.com',
                'password' => Hash::make('ivana123'),
                'remember_token' => Str::random(60),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
