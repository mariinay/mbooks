<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\FavBook;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Category::truncate();
        User::truncate();
        Author::truncate();
        Book::truncate();
        FavBook::truncate();
        //CartBook::truncate();


        User::factory(5)->create();
        $user1 = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin1234'),
            'admin' => true
        ]);
        $user2 = User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => Hash::make('user1234'),
            'admin' => false
        ]);
        $cat1 = Category::factory()->create();
        $cat2 = Category::factory()->create();

        Book::factory(5)->create([
            'category_id' => $cat1->id,
        ]);

        Book::factory(3)->create([
            'category_id' => $cat2->id,
        ]);

        $book1 = Book::factory()->create([
            'category_id' => $cat1->id,
        ]);

        $book2 = Book::factory()->create([
            'category_id' => $cat2->id,
        ]);

        FavBook::factory()->create([
            'user_id' => $user1->id,
            'book_id' => $book1->id,
        ]);

        FavBook::factory()->create([
            'user_id' => $user1->id,
            'book_id' => $book2->id,
        ]);
    }
}
