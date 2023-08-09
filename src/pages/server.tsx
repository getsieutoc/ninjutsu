import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { GeneralLayout } from '@/components';

import type { GetServerSidePropsContext } from 'next';
import { useAuth } from '@/hooks';

export default function ServerSidePage() {
  const { session } = useAuth();

  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  return (
    <GeneralLayout>
      <h1>Server Side Rendering</h1>
      <p>
        This page uses the <strong>getServerSession()</strong> method in{' '}
        <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getServerSession()</strong> in{' '}
        <strong>getServerSideProps()</strong> is the recommended approach if you
        need to support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require
        client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to
        render.
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </GeneralLayout>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
