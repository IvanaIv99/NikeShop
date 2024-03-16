<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
                'password' => md5('ivana123')
            ]
        ]);
    }
}
