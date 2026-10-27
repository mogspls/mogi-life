import type { ChatUser } from '@/types';
import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type AuthenticatedChatProps = {
    user: ChatUser;
    onSent: () => void;
};

export function AuthenticatedChat({
    user,
    onSent,
}: AuthenticatedChatProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        body: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!data.body.trim() || processing) {
            return;
        }

        post('/chat/messages', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset('body');
                onSent();
            },
        });
    }

    return (
        <>
            <p>Signed in as {user.name}.</p>

            <form onSubmit={submit}>
                <label htmlFor="chat-message">Say something</label>

                <textarea
                    id="chat-message"
                    name="body"
                    rows={3}
                    required
                    maxLength={2000}
                    placeholder="An excellent place for a questionable opinion."
                    value={data.body}
                    onChange={(event) =>
                        setData('body', event.target.value)
                    }
                    aria-invalid={Boolean(errors.body)}
                    aria-describedby={
                        errors.body ? 'chat-message-error' : undefined
                    }
                />

                {errors.body && (
                    <p id="chat-message-error" role="alert">
                        {errors.body}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={processing || !data.body.trim()}
                >
                    {processing ? 'Sending…' : 'Send'}
                </button>
            </form>
        </>
    );
}