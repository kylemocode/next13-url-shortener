import 'client-only';

export async function shortenUrl(url: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/generate-url`,
    {
      method: 'POST',
      body: JSON.stringify({ url }),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to shorten URL.');
  }

  return res.json();
}
