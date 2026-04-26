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

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  website?: string;
  source?: string;
}

const contactRateLimitMap = createRateLimitMap("contact");

function validatePayload(payload: ContactPayload): string | null {
  if (!isValidString(payload.name, 2)) {
    return ErrorResponses.INVALID_NAME.error;
  }

  if (!isValidEmail(payload.email)) {
    return ErrorResponses.INVALID_EMAIL.error;
  }

  if (!isValidString(payload.message, 10)) {
    return ErrorResponses.INVALID_MESSAGE.error;
  }

  return null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(contactRateLimitMap, `contact:${ip}`)) {
    return NextResponse.json(
      { error: ErrorResponses.TOO_MANY_REQUESTS.error },
      { status: ErrorResponses.TOO_MANY_REQUESTS.status }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
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
  const toEmail = process.env.CONTACT_TO_EMAIL || "info@csi-enc.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "CSI Smart Tech <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New contact inquiry from ${payload.name.trim()}`,
      html: `
        <h2>New contact inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email.trim())}</p>
        <p><strong>Company:</strong> ${escapeHtml(payload.company?.trim() || "Not provided")}</p>
        <p><strong>Phone:</strong> ${escapeHtml(payload.phone?.trim() || "Not provided")}</p>
        <p><strong>Source:</strong> ${escapeHtml(payload.source?.trim() || "contact-modal")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message.trim()).replaceAll("\n", "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact email send failed", error);
    return NextResponse.json(
      { error: ErrorResponses.SEND_FAILED.error },
      { status: ErrorResponses.SEND_FAILED.status }
    );
  }
}
