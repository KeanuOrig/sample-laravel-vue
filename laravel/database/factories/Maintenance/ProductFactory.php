<?php

namespace Database\Factories\Maintenance;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Maintenance\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'category' => $this->faker->randomElement(['Electronics', 'Clothing', 'Books']),
            'description' => $this->faker->sentence,
            'edit_by' => $this->faker->email,
            'image_url' => json_encode([
                [
                    'title' => $this->faker->word . '.jpg',
                    'url' => $this->faker->imageUrl(),
                    'filename' => $this->faker->uuid . '.jpg',
                    'created_at' => now()->toIso8601ZuluString(),
                ]
            ]),
            'date_time' => now(),
            'updated_at' => now(),
            'created_at' => now(),
            'created_at' => now(),
        ];
    }
}
