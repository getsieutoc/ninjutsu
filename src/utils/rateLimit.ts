import type { NextApiRequest, NextApiResponse } from 'next';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { IS_VERCEL } from './constants';

export const withRateLimit = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (
      IS_VERCEL &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ratelimit = new Ratelimit({
        redis: kv,
        limiter: Ratelimit.slidingWindow(10, '60s'), // rate limit to num requests per 60 seconds
      });

      const ip = req.headers['x-forwarded-for'];

      const {
        success,
        // limit,
        // reset,
        // remaining,
      } = await ratelimit.limit(`ratelimit_${ip}`);

      if (!success) {
        return res.status(429).end('You have reached request limit');
      }
    }

    return await handler(req, res);
  };
};
