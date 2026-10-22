import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

interface ResetPasswordProps {
	token: string;
	email: string;
};

export default function ResetPassword({
	token,
	email,
}: ResetPasswordProps) {
	const { data, setData, post, processing, errors, reset } = useForm({
		token,
		email,
		password: '',
		password_confirmation: '',
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		post('/reset-password', {
			onFinish: () => reset('password', 'password_confirmation'),
		});
	}

	return (
		<>
			<Head title="Reset password" />

			<main>
				<h1>Reset password</h1>
				<p>Enter your email address and choose a new password.</p>

				<form onSubmit={submit}>
					<div>
						<label htmlFor="email">Email address</label>

						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
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

						{errors.email && (
							<p id="email-error" role="alert">
								{errors.email}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="password">New password</label>

						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							required
							autoFocus
							value={data.password}
							onChange={(event) =>
								setData('password', event.target.value)
							}
							aria-invalid={Boolean(errors.password)}
							aria-describedby={
								errors.password ? 'password-error' : undefined
							}
						/>

						{errors.password && (
							<p id="password-error" role="alert">
								{errors.password}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="password_confirmation">
							Confirm new password
						</label>

						<input
							id="password_confirmation"
							name="password_confirmation"
							type="password"
							autoComplete="new-password"
							required
							value={data.password_confirmation}
							onChange={(event) =>
								setData(
									'password_confirmation',
									event.target.value,
								)
							}
							aria-invalid={Boolean(
								errors.password_confirmation,
							)}
							aria-describedby={
								errors.password_confirmation
									? 'confirmation-error'
									: undefined
							}
						/>

						{errors.password_confirmation && (
							<p id="confirmation-error" role="alert">
								{errors.password_confirmation}
							</p>
						)}
					</div>

					{errors.token && <p role="alert">{errors.token}</p>}

					<button type="submit" disabled={processing}>
						{processing ? 'Resetting password…' : 'Reset password'}
					</button>
				</form>
			</main>
		</>
	);
}