import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  createRateLimitMap,
  getClientIp,
  isRateLimited,
  escapeHtml,
  isValidEmail,
  isValidString,
  ErrorResponses,
} from "@/lib/api-utils";

interface NewsletterPayload {
  name: string;
  email: string;
  website?: string;
  source?: string;
}

const newsletterRateLimitMap = createRateLimitMap("newsletter");

function validatePayload(payload: NewsletterPayload): string | null {
  if (!isValidString(payload.name, 2)) {
    return ErrorResponses.INVALID_NAME.error;
  }

  if (!isValidEmail(payload.email)) {
    return ErrorResponses.INVALID_EMAIL.error;
  }

  return null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(newsletterRateLimitMap, `newsletter:${ip}`)) {
    return NextResponse.json(
      { error: ErrorResponses.TOO_MANY_REQUESTS.error },
      { status: ErrorResponses.TOO_MANY_REQUESTS.status }
    );
  }

  let payload: NewsletterPayload;

  try {
    payload = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json(
      { error: ErrorResponses.INVALID_PAYLOAD.error },
      { status: ErrorResponses.INVALID_PAYLOAD.status }
    );
  }

  // Honeypot field: bots usually populate hidden fields.
  if (payload.website && payload.website.trim().length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      { error: ErrorResponses.SERVICE_NOT_CONFIGURED.error },
      { status: ErrorResponses.SERVICE_NOT_CONFIGURED.status }
    );
  }

  const resend = new Resend(resendApiKey);
  const toEmail = process.env.NEWSLETTER_TO_EMAIL || "info@csi-enc.com";
  const fromEmail =
    process.env.NEWSLETTER_FROM_EMAIL ||
    "CSI Smart Tech <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New newsletter signup from ${payload.name.trim()}`,
      html: `
        <h2>New newsletter signup</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email.trim())}</p>
        <p><strong>Source:</strong> ${escapeHtml(payload.source?.trim() || "newsletter-form")}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Newsletter email send failed", error);
    return NextResponse.json(
      { error: ErrorResponses.SEND_FAILED.error },
      { status: ErrorResponses.SEND_FAILED.status }
    );
  }
}
