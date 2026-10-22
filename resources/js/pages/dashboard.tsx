import { useForm } from "@inertiajs/react";

interface DashboardProps {
    user: {
        id: number;
        name: string;
        email: string;
    }
}

function logout() {
}

export default function Dashboard({ user }: DashboardProps) {
    return (
        <main>
            <p>Welcome, {user.email}</p>
        </main>
    )
}
