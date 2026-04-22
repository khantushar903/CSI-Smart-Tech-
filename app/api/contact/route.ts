import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  website?: string;
  source?: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __contactRateLimitMap?: Map<string, RateLimitRecord>;
};

const contactRateLimitMap =
  globalForRateLimit.__contactRateLimitMap ??
  new Map<string, RateLimitRecord>();

globalForRateLimit.__contactRateLimitMap = contactRateLimitMap;

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return "unknown";
  }

  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = contactRateLimitMap.get(key);

  if (!record || record.resetAt <= now) {
    contactRateLimitMap.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  contactRateLimitMap.set(key, {
    ...record,
    count: record.count + 1,
  });

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validatePayload(payload: ContactPayload): string | null {
  if (!payload.name || payload.name.trim().length < 2) {
    return "Please provide a valid name.";
  }

  if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
    return "Please provide a valid email address.";
  }

  if (!payload.message || payload.message.trim().length < 10) {
    return "Please enter a message with at least 10 characters.";
  }

  return null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
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
      { error: "Contact service is not configured." },
      { status: 500 },
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
      { error: "Failed to send your message. Please try again." },
      { status: 500 },
    );
  }
}
