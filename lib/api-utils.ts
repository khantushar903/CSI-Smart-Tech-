/**
 * Shared API utility functions for rate limiting, validation, and security
 */

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

export type RateLimitRecord = {
  count: number;
  resetAt: number;
};

/**
 * Creates an isolated rate limit map for a specific feature
 * Uses global state to persist across serverless invocations
 */
export function createRateLimitMap(
  key: string
): Map<string, RateLimitRecord> {
  const globalForRateLimit = globalThis as typeof globalThis & {
    __rateLimitMaps?: Record<string, Map<string, RateLimitRecord>>;
  };

  if (!globalForRateLimit.__rateLimitMaps) {
    globalForRateLimit.__rateLimitMaps = {};
  }

  if (!globalForRateLimit.__rateLimitMaps[key]) {
    globalForRateLimit.__rateLimitMaps[key] = new Map();
  }

  return globalForRateLimit.__rateLimitMaps[key];
}

/**
 * Extracts client IP from request headers
 * Falls back to "unknown" if not available
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return "unknown";
  }
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

/**
 * Checks if a request should be rate limited
 * Returns true if rate limit is exceeded, false otherwise
 */
export function isRateLimited(
  rateLimitMap: Map<string, RateLimitRecord>,
  key: string
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || record.resetAt <= now) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  rateLimitMap.set(key, {
    ...record,
    count: record.count + 1,
  });

  return false;
}

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Validates email format using regex
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates a string has minimum length (with trim)
 */
export function isValidString(
  value: string | undefined,
  minLength: number = 1
): boolean {
  return !!(value && value.trim().length >= minLength);
}

/**
 * Common error responses
 */
export const ErrorResponses = {
  TOO_MANY_REQUESTS: {
    error: "Too many requests. Please try again shortly.",
    status: 429,
  },
  INVALID_PAYLOAD: { error: "Invalid request payload.", status: 400 },
  INVALID_NAME: {
    error: "Please provide a valid name.",
    status: 400,
  },
  INVALID_EMAIL: {
    error: "Please provide a valid email address.",
    status: 400,
  },
  INVALID_MESSAGE: {
    error: "Please enter a message with at least 10 characters.",
    status: 400,
  },
  SERVICE_NOT_CONFIGURED: {
    error: "Service is not configured.",
    status: 500,
  },
  SEND_FAILED: {
    error: "Failed to send your message. Please try again.",
    status: 500,
  },
} as const;
