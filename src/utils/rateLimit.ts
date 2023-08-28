import type { NextApiRequest, NextApiResponse } from 'next';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('KV_REST_API_URL and KV_REST_API_TOKEN must be set');
}

export const withRateLimit = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ratelimit = new Ratelimit({
      redis: kv,
      // rate limit to num requests per 60 seconds
      limiter: Ratelimit.slidingWindow(10, '60s'),
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

    return await handler(req, res);
  };
};
