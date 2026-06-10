import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendResetEmail(email: string, link: string) {
  await resend.emails.send({
    from: "Auth System <onboarding@yourdomain.com>",
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset</p>
      <p><a href="${link}">Click here to reset password</a></p>
      <p>This link expires in 15 minutes.</p>
    `,
  });
}