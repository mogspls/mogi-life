interface DashboardProps {
    user: {
        id: number;
        name: string;
        email: string;
    }
}

export default function Dashboard({ user }: DashboardProps) {
    return (
        <main>
            <p>Welcome, {user.email}</p>
        </main>
    )
}
