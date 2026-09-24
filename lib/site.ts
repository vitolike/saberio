export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saberio.com.br',
).origin;
