import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // only support GET request
  if (method !== 'GET') {
    return res.status(400).json({
      message: 'Only GET request are allowed.',
    });
  }

  const { urlCode } = req.query;

  if (typeof urlCode == 'string') {
    const result = await prisma.$transaction(async tx => {
      const originUrl = await tx.url.findUnique({
        where: {
          urlCode,
        },
      });

      if (!originUrl) {
        return null;
      }

      // update analytic view count
      await tx.urlAnalytic.update({
        where: {
          url_id: originUrl.id,
        },
        data: {
          clickedCount: {
            increment: 1,
          },
        },
      });

      return originUrl;
    });

    if (!result) {
      return res.status(400).json({
        statusCode: 400,
        error: {
          message: 'Invalid short url code',
        },
        data: null,
      });
    }

    // Use `Moved Temporarily` status code in order to get analytic data
    return res.status(302).redirect(result.originalUrl);
  }
}
