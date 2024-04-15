<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(10)->create();

        $user = User::where('email', 'admin@admin.com')->first();

        if (! $user) {
            User::create([
                'name' => 'Administrator',
                'email' => 'admin@admin.com',
                'role' => 'admin',
                'password' => bcrypt('password'),
            ]);
        } 
    }
}
