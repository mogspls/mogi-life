import { AuthenticatedChat } from '@/components/chat/authenticated-chat';
import type { ChatMessage, ChatUser } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';

export type { ChatMessage, ChatUser } from '@/types';

type ChatboxProps = {
    user: ChatUser | null;
};

export default function Chatbox({ user }: ChatboxProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const loadMessages = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setHistoryError(null);

        try {
            const response = await fetch('/chat/messages', {
                headers: {
                    Accept: 'application/json',
                },
                cache: 'no-store',
                signal,
            });

            if (!response.ok) {
                throw new Error(
                    `Could not load messages (HTTP ${response.status}).`,
                );
            }

            const result: { messages: ChatMessage[] } =
                await response.json();

            if (!Array.isArray(result.messages)) {
                throw new Error(
                    'The server did not return a messages array.',
                );
            }

            if (!signal?.aborted) {
                setMessages(result.messages);
            }
        } catch (error) {
            if (!signal?.aborted) {
                setHistoryError(
                    error instanceof Error
                        ? error.message
                        : 'Could not load previous messages.',
                );
            }
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        void loadMessages(controller.signal);

        return () => controller.abort();
    }, [loadMessages]);

    // Mounted for everyone, including guests.
    useEchoPublic<{ message: ChatMessage }>(
        'chatroom',
        '.chat.message.sent',
        ({ message }) => {
            setLiveMessages((previous) => {
                const unique = new Map(
                    [...previous, message].map((item) => [
                        item.id,
                        item,
                    ]),
                );

                return [...unique.values()]
                    .sort((a, b) => a.id - b.id)
                    .slice(-100);
            });
        },
    );

    const visibleMessages = [
        ...new Map(
            [...messages, ...liveMessages].map((message) => [
                message.id,
                message,
            ]),
        ).values(),
    ]
        .sort((a, b) => a.id - b.id)
        .slice(-100);

    return (
        <section aria-label="mogi’s chatbox">
            <h2>You online?</h2>

            {historyError && (
                <div role="alert">
                    <p>{historyError}</p>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => void loadMessages()}
                    >
                        Try again
                    </button>
                </div>
            )}

            <ol aria-label="Chat messages">
                {loading && visibleMessages.length === 0 && (
                    <li>Loading messages…</li>
                )}

                {!loading &&
                    !historyError &&
                    visibleMessages.length === 0 && (
                        <li>Awfully quiet in here. Make it weird.</li>
                    )}

                {visibleMessages.map((message) => (
                    <li key={message.id}>
                        <strong>
                            {message.user.name}
                            {message.user.id === user?.id && ' (you)'}
                        </strong>

                        <p
                            style={{
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'anywhere',
                            }}
                        >
                            {message.body}
                        </p>
                    </li>
                ))}
            </ol>

            {user ? (
                <AuthenticatedChat
                    key={user.id}
                    user={user}
                    onSent={() => void loadMessages()}
                />
            ) : (
                <ChatSignup />
            )}
        </section>
    );
}

function ChatSignup() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        website: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post('/register', {
            preserveScroll: true,
            onFinish: () => reset('password'),
        });
    }

    return (
        <>
            <hr />

            <h3>Would be great if you actually introduced yourself.</h3>

            <p>
                Pick a username you’ll regret in ten years,
                just don’t let your password be “password”.
            </p>

            <form onSubmit={submit}>
                <fieldset disabled={processing}>
                    <legend>Create your account</legend>

                    <div>
                        <label htmlFor="chat-signup-username">
                            Username*
                        </label>

                        <input
                            id="chat-signup-username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="gorgonzola"
                            required
                            maxLength={30}
                            value={data.username}
                            onChange={(event) =>
                                setData('username', event.target.value)
                            }
                            aria-invalid={Boolean(errors.username)}
                            aria-describedby={
                                errors.username
                                    ? 'chat-signup-username-error'
                                    : undefined
                            }
                        />

                        {errors.username && (
                            <p id="chat-signup-username-error" role="alert">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="chat-signup-password">
                            Password*
                        </label>

                        <input
                            id="chat-signup-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={data.password}
                            onChange={(event) =>
                                setData('password', event.target.value)
                            }
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                                errors.password
                                    ? 'chat-signup-password-error'
                                    : undefined
                            }
                        />

                        {errors.password && (
                            <p id="chat-signup-password-error" role="alert">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="chat-signup-website">
                            Personal website (optional)
                        </label>

                        <input
                            id="chat-signup-website"
                            name="website"
                            type="text"
                            inputMode="url"
                            autoComplete="url"
                            placeholder="gorgonzola.com"
                            value={data.website}
                            onChange={(event) =>
                                setData('website', event.target.value)
                            }
                            aria-invalid={Boolean(errors.website)}
                            aria-describedby={
                                errors.website
                                    ? 'chat-signup-website-error'
                                    : undefined
                            }
                        />

                        {errors.website && (
                            <p id="chat-signup-website-error" role="alert">
                                {errors.website}
                            </p>
                        )}
                    </div>

                    <button type="submit">
                        {processing ? 'Signing you up…' : 'Sign up'}
                    </button>
                </fieldset>
            </form>

            <p>
                Already introduced yourself?{' '}
                <Link href="/login">Log in.</Link>
            </p>
        </>
    );
}