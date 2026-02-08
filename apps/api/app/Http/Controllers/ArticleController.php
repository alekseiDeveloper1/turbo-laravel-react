<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Resources\ArticleResource;
use App\Actions\CreateArticleAction;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\StoreCommentRequest;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::withCount('comments')
            ->latest()
            ->paginate(10);

        return ArticleResource::collection($articles);
    }

    public function show(Article $article)
    {
        return new ArticleResource(
            $article->load(['comments' => fn($q) => $q->latest()])
        );
    }

    public function store(StoreArticleRequest $request, CreateArticleAction $action)
    {
        $article = $action->execute($request->validated());
        return new ArticleResource($article);
    }

    public function storeComment(StoreCommentRequest $request, Article $article)
    {
        $comment = $article->comments()->create($request->validated());
        return response()->json($comment, 201);
    }
}
