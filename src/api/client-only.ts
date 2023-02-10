import 'client-only';
/* reference: https://beta.nextjs.org/docs/rendering/server-and-client-components#keeping-server-only-code-out-of-client-components-poisoning */

export async function shortenUrl(url: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/generate-url`,
    {
      method: 'POST',
      body: JSON.stringify({ url }),
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to shorten URL.');
  }

  return res.json();
}
