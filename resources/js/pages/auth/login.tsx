import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

export default function Login({ status }: { status: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post("/login", {
            onFinish: () => reset("password"),
        });
    }

    return (
        <>
            <Head title="Login" />

            {status && <p role="status">{status}</p>}
            <main>
                <h1>Welcome back!</h1>

                <form onSubmit={submit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    {errors.email && <p>{errors.email}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    {errors.password && <p>{errors.password}</p>}

                    <label>
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData("remember", e.target.checked)}
                        />
                        Remember me
                    </label>

                    <button type="submit" disabled={processing}>
                        {processing ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <Link href="/forgot-password">Forgot password?</Link>
                <p>
                    New here? <Link href="/register">Register</Link>
                </p>
            </main>
        </>
    );
}
