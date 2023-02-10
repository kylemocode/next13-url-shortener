// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { isWebUri } from 'valid-url';
import { generateShortUrl, prisma } from '@/libs/index';

type RequestData = {
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Only support POST request
  if (method !== 'POST') {
    return res.status(400).json({
      message: 'Only POST request are allowed.',
    });
  }

  const { url }: RequestData = req.body;
  const { host } = req.headers;
  const { shortCode, shortUrl } = generateShortUrl(host as string);

  // check if the url is valid or not
  if (!isWebUri(url)) {
    return res.status(400).json({
      statusCode: 400,
      error: {
        message: 'Invalid Url',
      },
      data: null,
    });
  }

  /**
   * original url found -> query it
   * else -> create a new short url
   */
  const result = await prisma.$transaction(async tx => {
    const originalUrl = await tx.url.findFirst({
      where: {
        originalUrl: url,
      },
    });

    if (originalUrl) return originalUrl;

    // create a new shortened URL
    const newUrl = await tx.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        urlCode: shortCode,
      },
    });

    // analytic
    await tx.urlAnalytic.create({
      data: {
        clickedCount: 0,
        url: {
          connect: {
            id: newUrl.id,
          },
        },
      },
    });

    return newUrl;
  });

  return res.status(200).json({
    statusCode: 200,
    error: null,
    data: {
      originalUrl: result.originalUrl,
      shortUrl: result.shortUrl,
      code: result.urlCode,
    },
  });
}
