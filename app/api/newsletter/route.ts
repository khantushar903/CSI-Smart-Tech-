import { NextResponse } from "next/server";
import { Resend } from "resend";

interface NewsletterPayload {
  name: string;
  email: string;
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
  __newsletterRateLimitMap?: Map<string, RateLimitRecord>;
};

const newsletterRateLimitMap =
  globalForRateLimit.__newsletterRateLimitMap ??
  new Map<string, RateLimitRecord>();

globalForRateLimit.__newsletterRateLimitMap = newsletterRateLimitMap;

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return "unknown";
  }

  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = newsletterRateLimitMap.get(key);

  if (!record || record.resetAt <= now) {
    newsletterRateLimitMap.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  newsletterRateLimitMap.set(key, {
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

function validatePayload(payload: NewsletterPayload): string | null {
  if (!payload.name || payload.name.trim().length < 2) {
    return "Please provide a valid name.";
  }

  if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
    return "Please provide a valid email address.";
  }

  return null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(`newsletter:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: NewsletterPayload;

  try {
    payload = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

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
      { error: "Newsletter service is not configured." },
      { status: 500 },
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
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }
}
