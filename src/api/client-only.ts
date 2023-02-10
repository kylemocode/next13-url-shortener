import 'client-only';
/* reference: https://beta.nextjs.org/docs/rendering/server-and-client-components#keeping-server-only-code-out-of-client-components-poisoning */

import { API_URL } from '@/libs/generateShortUrl';

export async function shortenUrl(url: string) {
  const res = await fetch(`${API_URL}/api/generate-url`, {
    method: 'POST',
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error('Failed to shorten URL.');
  }

  return res.json();
}
