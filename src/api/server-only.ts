import 'server-only';
/* reference: https://beta.nextjs.org/docs/rendering/server-and-client-components#keeping-server-only-code-out-of-client-components-poisoning */

export async function getAnalyticCount(urlCode: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analytic/${urlCode}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to get analytic data');
  }

  return res.json();
}
