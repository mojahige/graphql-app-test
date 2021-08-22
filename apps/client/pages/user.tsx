import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { useUsersQuery, UsersDocument } from '../lib/generated/client';
import { BASE_URL } from '../client';
import { BaseLayout } from '../layouts/BaseLayout';
import {
  Box,
  Heading,
  SimpleGrid,
  VisuallyHidden,
  Flex,
} from '@chakra-ui/react';
import type { NextPage, GetServerSideProps } from 'next';
import type { Query } from '../lib/generated/client';

type UserUsersResponse = ReturnType<typeof useUsersQuery>;
interface Props {
  data: Pick<Query, 'users'>;
}

export const User: NextPage<Props> = (props) => {
  return (
    <BaseLayout>
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          md: 4,
        }}
        spacing={{
          base: 4,
          md: 6,
        }}
      >
        {props.data?.users.map((user) => {
          return (
            <Box
              as="section"
              key={user.id}
              borderWidth="1px"
              borderRadius="lg"
              padding={4}
            >
              <Heading as="h1" size="md">
                {user.name}
              </Heading>
              <Box marginTop={2}>
                <Flex as="p" gridGap="8px">
                  <Box as="span" flexShrink={0}>
                    <VisuallyHidden>Email</VisuallyHidden>
                    📧
                  </Box>
                  <Box as="span" overflowWrap="anywhere">
                    {user.email}
                  </Box>
                </Flex>
              </Box>
            </Box>
          );
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
  const result = await client
    ?.query<UserUsersResponse>(UsersDocument)
    .toPromise();

  return {
    props: {
      data: result?.data,
      // urqlState is a keyword here so withUrqlClient can pick it up.
      // urqlState: ssrCache.extractData(),
    },
    // revalidate: 600,
  };
};

export default withUrqlClient(
  (_ssr) => {
    return {
      url: BASE_URL,
    };
  },
  { ssr: false }
)(User);
