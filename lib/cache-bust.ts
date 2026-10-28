export const CACHE_BUST = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);

export function cacheBust(url: string): string {
  if (!url || url.startsWith('http') || url.startsWith('data:')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${CACHE_BUST}`;
}
