<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable;

    public function __construct(public array $message)
    {
        //
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('chatroom'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'chat.message.sent';
    }
}
