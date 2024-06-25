import { Resend } from "resend";
import { db } from "./db";
import { Role } from "@prisma/client";

const resend = new Resend(
  process.env.RESEND_API_KEY! || "83847892374892378942"
);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@auth-masterclass-tutorial.com",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  try {
    await resend.emails.send({
      from: "mail@auth-masterclass-tutorial.com",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });
  } catch (error) {
    console.log("error went sending password reset", error);
    return null;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  try {
    await resend.emails.send({
      from: "mail@auth-masterclass-tutorial.com",
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
  } catch (error) {
    console.log("error went sending verfication email", error);
    return null;
  }
};

export const sendInvitationEmail = async (
  role: Role,
  email: string,
  agencyId: string
) => {
  const resposne = await db.invitation.create({
    data: { email, agencyId, role },
  });

  try {
    await resend.emails.send({
      from: "mail@auth-masterclass-tutorial.com",
      to: email,
      subject: `You are Received invitation to join agency. Confirm your email and start using your platform`,
      html: `<p>Click <a href="${domain}">here</a> to confirm email.</p>`,
    });
  } catch (error) {
    console.log("error went sending verfication email", error);
    return null;
  }
  return resposne;
};
