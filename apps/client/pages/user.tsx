import { ssrExchange, dedupExchange, fetchExchange, cacheExchange } from 'urql';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import {
  useUsersQuery,
  UsersDocument,
  User as UserModel,
} from '../lib/generated/client';
import { BASE_URL } from '../client';
import { BaseLayout } from '../layouts/BaseLayout';
import {
  Box,
  Heading,
  SimpleGrid,
  VisuallyHidden,
  Flex,
  VStack,
} from '@chakra-ui/react';
import type { NextPage, GetServerSideProps } from 'next';

const UserCard: React.FC<UserModel> = (props: UserModel) => {
  return (
    <Box as="section" borderWidth="1px" borderRadius="lg" padding={4}>
      <Heading as="h1" size="md">
        {props.name}
      </Heading>
      <VStack marginTop={2} spacing={2} borderTopWidth="1px" paddingTop={4}>
        <Flex as="p" gridGap="8px" justifyContent="start" width="100%">
          <Box as="span" flexShrink={0}>
            <VisuallyHidden>ID</VisuallyHidden>
            🆔
          </Box>
          <Box as="span" overflowWrap="anywhere">
            {props.id}
          </Box>
        </Flex>
        {props.email ? (
          <Flex as="p" gridGap="8px" justifyContent="start" width="100%">
            <Box as="span" flexShrink={0}>
              <VisuallyHidden>Email</VisuallyHidden>
              📧
            </Box>
            <Box as="span" overflowWrap="anywhere">
              {props.email}
            </Box>
          </Flex>
        ) : null}
      </VStack>
    </Box>
  );
};

export const User: NextPage = () => {
  const [{ data }] = useUsersQuery();

  return (
    <BaseLayout>
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        spacing={{
          base: 4,
          md: 6,
        }}
      >
        {data?.users.map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}
      </SimpleGrid>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: BASE_URL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(UsersDocument).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    // revalidate: 600,
  };
};

export default withUrqlClient(() => ({
  url: BASE_URL,
}))(User);
