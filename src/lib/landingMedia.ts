/** Encode filenames with spaces for use in <img src> / public URLs */
export function landingImage(file: string) {
  return `/landingpage/${encodeURIComponent(file)}`;
}
