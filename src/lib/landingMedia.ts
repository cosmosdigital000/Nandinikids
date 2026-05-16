/** Official school logo (public/landingpage) — use for navbar, favicon, footer */
export const SITE_LOGO_FILE = "logo nandinikids.jpg";

/** Encode filenames with spaces for use in <img src> / public URLs */
export function landingImage(file: string) {
  return `/landingpage/${encodeURIComponent(file)}`;
}

/** Resolved URL for {@link SITE_LOGO_FILE} */
export const SITE_LOGO_URL = landingImage(SITE_LOGO_FILE);
