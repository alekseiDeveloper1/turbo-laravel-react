<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isList = $request->routeIs('*.index');

        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $isList ? Str::limit($this->content, 150) : $this->content,
            'created_at' => $this->created_at->toIso8601String(),
            'comments_count' => $this->whenCounted('comments'),
            'comments' => $this->whenLoaded('comments'),
        ];
    }
}
