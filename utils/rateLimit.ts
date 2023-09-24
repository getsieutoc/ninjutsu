import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

import { IS_VERCEL } from './constants';

export const withRateLimit = (
  handler: (req: NextRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    if (
      IS_VERCEL &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ratelimit = new Ratelimit({
        redis: kv,
        limiter: Ratelimit.slidingWindow(10, '60s'), // rate limit to num requests per 60 seconds
      });

      const ip = req.headers.get('x-forwarded-for');

      const { success } = await ratelimit.limit(`ratelimit_${ip}`);

      if (!success) {
        return NextResponse.json(
          { message: 'You have reached request limit' },
          { status: 429 }
        );
      }
    }

    return await handler(req);
  };
};
