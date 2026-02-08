<?php

namespace Tests\Feature;

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ArticleApiTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_list_articles()
    {
        Article::factory()->count(3)->create();

        $response = $this->getJson('/api/articles');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    #[Test]
    public function it_can_create_an_article()
    {
        $data = [
            'title' => 'Тестовая статья',
            'content' => 'Текст новой статьи'
        ];

        $response = $this->postJson('/api/articles', $data);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', $data['title']);

        $this->assertDatabaseHas('articles', $data);
    }

    #[Test]
    public function it_validates_article_creation()
    {
        $response = $this->postJson('/api/articles', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title', 'content']);
    }

    #[Test]
    public function it_can_show_a_single_article_with_comments()
    {
        $article = Article::factory()->create();
        $article->comments()->create([
            'author_name' => 'Ivan',
            'content' => 'Nice post!'
        ]);

        $response = $this->getJson("/api/articles/{$article->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('data.id', $article->id)
                 ->assertJsonCount(1, 'data.comments');
    }

    #[Test]
    public function it_can_add_a_comment_to_an_article()
    {
        $article = Article::factory()->create();
        $commentData = [
            'author_name' => 'Petr',
            'content' => 'New Comment'
        ];

        $response = $this->postJson("/api/articles/{$article->id}/comments", $commentData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('comments', array_merge($commentData, ['article_id' => $article->id]));
    }
}
