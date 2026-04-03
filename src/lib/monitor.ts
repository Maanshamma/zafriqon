/**
 * Internal monitoring for the contact/engage system.
 * Silent, server-side only. No sensitive user data is stored.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type SubmissionStatus =
  | 'success' |'blocked_csrf' |'blocked_honeypot' |'blocked_abuse_pattern' |'rate_limited' |'failure';

export interface SubmissionLogEntry {
  timestamp: string;
  status: SubmissionStatus;
  ip: string;
  reason?: string;
}

export interface ErrorLogEntry {
  timestamp: string;
  errorType: string;
  context: string; // non-sensitive request context only
}

// ─── In-memory stores (server-side only) ─────────────────────────────────────

const submissionLog: SubmissionLogEntry[] = [];
const errorLog: ErrorLogEntry[] = [];

// Tracks recent failure timestamps for anomaly detection
const recentFailures: number[] = [];

// Anomaly detection config
const ANOMALY_WINDOW_MS = 5 * 60 * 1000; // 5-minute window
const ANOMALY_THRESHOLD = 5;             // more than 5 failures triggers anomaly

let systemUnstable = false;

// ─── Anomaly Detection ────────────────────────────────────────────────────────

function checkAnomaly(): void {
  const now = Date.now();
  // Prune entries outside the window
  while (recentFailures.length > 0 && now - recentFailures[0] > ANOMALY_WINDOW_MS) {
    recentFailures.shift();
  }

  if (recentFailures.length > ANOMALY_THRESHOLD) {
    if (!systemUnstable) {
      systemUnstable = true;
      console.warn(
        `[MONITOR_ANOMALY] time=${new Date(now).toISOString()} ` +
        `failures_in_window=${recentFailures.length} ` +
        `window_ms=${ANOMALY_WINDOW_MS} ` +
        `status=UNSTABLE — anomaly threshold exceeded`
      );
    }
  } else {
    // Reset unstable flag once failures drop below threshold
    if (systemUnstable) {
      systemUnstable = false;
      console.info(
        `[MONITOR_ANOMALY] time=${new Date(now).toISOString()} ` +
        `status=STABLE — failure count back within threshold`
      );
    }
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Log a submission attempt outcome.
 * @param status  - outcome of the submission
 * @param ip      - client IP (no other user data)
 * @param reason  - optional detail (e.g. "too_fast", "name_field")
 */
export function logSubmission(
  status: SubmissionStatus,
  ip: string,
  reason?: string
): void {
  const timestamp = new Date().toISOString();
  const entry: SubmissionLogEntry = { timestamp, status, ip, reason };
  submissionLog.push(entry);

  const reasonPart = reason ? ` reason=${reason}` : '';
  console.log(`[CONTACT_LOG] time=${timestamp} ip=${ip} status=${status}${reasonPart}`);

  // Track failures for anomaly detection
  if (status === 'failure') {
    recentFailures.push(Date.now());
    checkAnomaly();
  }
}

/**
 * Log an API error with context (no sensitive user data).
 * @param errorType - category/label for the error
 * @param context   - non-sensitive context string (e.g. "sendgrid_main_send")
 * @param err       - the original error object (message only, no user data)
 */
export function logError(
  errorType: string,
  context: string,
  err?: unknown
): void {
  const timestamp = new Date().toISOString();
  const entry: ErrorLogEntry = { timestamp, errorType, context };
  errorLog.push(entry);

  const errMessage = err instanceof Error ? err.message : String(err ?? 'unknown');
  console.error(
    `[CONTACT_ERROR] time=${timestamp} type=${errorType} context=${context} error="${errMessage}"`
  );

  // API errors also count as failures for anomaly detection
  recentFailures.push(Date.now());
  checkAnomaly();
}

/**
 * Returns current system stability status (for internal diagnostics only).
 */
export function isSystemUnstable(): boolean {
  return systemUnstable;
}
