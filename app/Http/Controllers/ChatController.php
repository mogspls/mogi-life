<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageSent;
use App\Models\ChatMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ChatController extends Controller
{
    public function index(): JsonResponse
    {
        $messages = ChatMessage::query()
            ->with('user:id,name')
            ->orderByDesc('id')
            ->limit(50)
            ->get()
            ->reverse()
            ->values()
            ->map(fn (ChatMessage $message) => $message->payload());

        return response()
            ->json([
                'messages' => $messages,
            ])
            ->header('Cache-Control', 'no-store');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $body = trim($validated['body']);

        if ($body === '') {
            throw ValidationException::withMessages([
                'body' => 'Enter a message before sending.',
            ]);
        }

        $message = ChatMessage::create([
            'user_id' => $request->user()->id,
            'body' => $body,
        ]);

        $message->load('user:id,name');

        ChatMessageSent::dispatch($message->payload());

        return back();
    }
}