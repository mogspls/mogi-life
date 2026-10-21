import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post("/register", {
            onFinish: () => {
                reset("password", "password_confirmation");
            },
        });
    }

    return (
        <>
            <Head title="Register" />

            <main>
                <h1>Join mogi!</h1>

                <form onSubmit={submit}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    {errors.name && <p>{errors.name}</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    {errors.email && <p>{errors.email}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    {errors.password && <p>{errors.password}</p>}

                    <label htmlFor="confirmation">Confirm password</label>
                    <input
                        id="confirmation"
                        type="password"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    {errors.password_confirmation && (
                        <p>{errors.password_confirmation}</p>
                    )}

                    <button type="submit" disabled={processing}>
                        {processing ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p>
                    Already registered? <Link href="/login">Log in</Link>
                </p>
            </main>
        </>
    );
}
