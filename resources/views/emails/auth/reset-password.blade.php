<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset your password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f2; color:#242424; font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table
                    role="presentation"
                    width="560"
                    cellpadding="0"
                    cellspacing="0"
                    style="width:100%; max-width:560px;"
                >
                    <tr>
                        <td style="padding:0 0 24px;">
                            <a
                                href="{{ config('app.url') }}"
                                style="color:#242424; font-size:28px; font-weight:bold; text-decoration:none;"
                            >mogi.</a>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:32px; background-color:#ffffff; border:1px solid #e4e4e0;">
                            <h1 style="margin:0 0 24px; font-size:26px; line-height:1.3;">
                                A fresh start?
                            </h1>

                            <p style="margin:0 0 16px; font-size:16px; line-height:1.6;">
                                {{ filled($name) ? "Hi {$name}," : 'Hi there,' }}
                            </p>

                            <p style="margin:0 0 24px; font-size:16px; line-height:1.6;">
                                We received a request to reset your mogi account
                                password. Use the button below to choose a new one.
                            </p>

                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td bgcolor="#242424" style="border-radius:6px;">
                                        <a
                                            href="{{ $resetUrl }}"
                                            style="display:inline-block; padding:14px 24px; border:1px solid #242424; border-radius:6px; color:#ffffff; font-size:16px; font-weight:bold; text-decoration:none;"
                                        >Reset my password</a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:24px 0 16px; color:#666666; font-size:14px; line-height:1.6;">
                                This link expires in {{ $expiresIn }} minutes.
                            </p>

                            <p style="margin:0; color:#666666; font-size:14px; line-height:1.6;">
                                Didn’t request this? You can ignore this email.
                                Your password will stay the same.
                            </p>

                            <hr style="margin:28px 0; border:0; border-top:1px solid #e4e4e0;">

                            <p style="margin:0 0 8px; color:#666666; font-size:12px; line-height:1.6;">
                                If the button doesn’t work, copy and paste this
                                link into your browser:
                            </p>

                            <a
                                href="{{ $resetUrl }}"
                                style="color:#444444; font-size:12px; line-height:1.6; word-break:break-all;"
                            >{{ $resetUrl }}</a>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:24px 0; color:#777777; font-size:12px; line-height:1.6;">
                            &copy; {{ date('Y') }} mogi.
                            <br>
                            An automated email from {{ config('app.name') }}.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>