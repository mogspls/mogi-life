import Chatbox from "@/components/chat/chat-box";
import { ChatMessage, User } from "@/types";
// import { useForm } from "@inertiajs/react";

interface DashboardProps {
    user: {
        id: number;
        name: string;
        email: string;
    }
}

export default function Dashboard({ user, messages }: {user: User, messages: ChatMessage}) {
    return (
        <main>
            <p>Welcome, {user.email}</p>

            <Chatbox user={user ?? null}/>
        </main>
    )
}
