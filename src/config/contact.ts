/**
 * School contact — update SCHOOL_PHONE_DIGITS to your 10-digit mobile (no +91).
 * Used for tel:, WhatsApp, and displayed numbers across the site.
 */
export const SCHOOL_PHONE_DIGITS = "9876543210";

export const telHref = `tel:+91${SCHOOL_PHONE_DIGITS}`;

export const waBaseUrl = `https://wa.me/91${SCHOOL_PHONE_DIGITS}`;

export function waWithText(message: string) {
  return `${waBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const phoneDisplay = `+91 ${SCHOOL_PHONE_DIGITS.slice(0, 5)}-${SCHOOL_PHONE_DIGITS.slice(5)}`;
