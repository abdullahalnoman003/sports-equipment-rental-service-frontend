export function friendlyError(message: string | null | undefined, fallback: string): string {
  if (!message) return fallback
  if (/access token( is)? required/i.test(message)) return fallback
  if (/invalid or expired access token/i.test(message)) return fallback
  return message
}
