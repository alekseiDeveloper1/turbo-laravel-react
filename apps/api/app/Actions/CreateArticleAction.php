<?php

namespace App\Actions;

use App\Models\Article;

class CreateArticleAction
{
    public function execute(array $data): Article
    {
        return Article::create([
            'title' => $data['title'],
            'content' => $data['content'],
        ]);
    }
}
