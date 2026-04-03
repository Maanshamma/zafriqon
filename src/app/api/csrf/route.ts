import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

// In-memory CSRF token store: token -> expiry timestamp
const csrfTokenStore = new Map<string, number>();

const CSRF_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Cleanup expired tokens periodically
function pruneExpiredTokens() {
  const now = Date.now();
  for (const [token, expiry] of csrfTokenStore.entries()) {
    if (now > expiry) {
      csrfTokenStore.delete(token);
    }
  }
}

export function generateCsrfToken(): string {
  pruneExpiredTokens();
  const token = randomBytes(32).toString('hex');
  csrfTokenStore.set(token, Date.now() + CSRF_TOKEN_TTL_MS);
  return token;
}

export function validateCsrfToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false;
  const expiry = csrfTokenStore.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    csrfTokenStore.delete(token);
    return false;
  }
  // Single-use: remove after successful validation
  csrfTokenStore.delete(token);
  return true;
}

export async function GET() {
  const token = generateCsrfToken();
  return NextResponse.json({ token });
}
