import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type ForgotPasswordProps = {
	status?: string;
};

export default function ForgotPassword({ status }: ForgotPasswordProps) {
	const { data, setData, post, processing, errors } = useForm({
		email: '',
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		post('/forgot-password', {
			preserveScroll: true,
		});
	}

	return (
		<>
			<Head title="Forgot password" />

			<main>
				<section>
					<h1>Forgot password?</h1>
					<p>Enter your email address and we’ll send you a link to reset your password.</p>

					{status && (<p role="status">{status}</p>)}

					<form onSubmit={submit}>
						<div>
							<label htmlFor="email">Email address</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								autoFocus
								required
								value={data.email}
								onChange={(event) =>
									setData('email', event.target.value)
								}
								aria-invalid={Boolean(errors.email)}
								aria-describedby={
									errors.email ? 'email-error' : undefined
								}
							/>
							{errors.email && (<p id="email-error" role="alert"> {errors.email} </p>)}
						</div>
						<button type="submit" disabled={processing}>
							{processing ? 'Sending reset link…' : 'Send password reset link'}
						</button>
					</form>

					<p><Link href="/login">Back to sign in</Link></p>
				</section>
			</main>
		</>
	);
}