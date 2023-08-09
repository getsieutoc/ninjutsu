import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { Button, GeneralLayout, Text, VStack } from '@/components';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from '@/hooks';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { callbackUrl = 'http://localhost:3000' } = router.query;
  console.log('### callbackUrl: ', { callbackUrl });

  return (
    <GeneralLayout showNavbar={false} centerContent>
      <Text fontSize="3xl" fontWeight="bold">
        Sign In
      </Text>

      <VStack>
        {Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            width="100%"
            colorScheme="gray"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: callbackUrl as string,
              })
            }
          >
            Sign in with {provider.name}
          </Button>
        ))}
      </VStack>
    </GeneralLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
