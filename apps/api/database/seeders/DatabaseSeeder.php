<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        \App\Models\Article::create([
            'title' => 'Первая статья',
            'content' => 'Содержание первой тестовой статьи'
        ]);
        \App\Models\Article::create([
            'title' => 'Вторая статья',
            'content' => 'Содержание второй тестовой статьи'
        ]);

    }
}
