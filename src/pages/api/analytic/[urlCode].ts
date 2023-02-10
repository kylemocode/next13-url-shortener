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
    const analytic = await prisma.urlAnalytic.findFirst({
      where: {
        url: {
          urlCode,
        },
      },
      include: {
        url: true,
      },
    });

    if (!analytic) {
      return res.status(400).json({
        statusCode: 400,
        error: {
          message: 'Analytic not found',
        },
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        clickedCount: analytic.clickedCount,
        url: {
          originalUrl: analytic.url.originalUrl,
          shortUrl: analytic.url.shortUrl,
          urlCode: analytic.url.urlCode,
        },
      },
    });
  }
}
