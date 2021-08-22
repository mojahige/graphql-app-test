import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { useUsersQuery, UsersDocument } from '../lib/generated/client';
import { BASE_URL } from '../client';
import type { NextPage, GetServerSideProps } from 'next';
import type { Query } from '../lib/generated/client';

type UserUsersResponse = ReturnType<typeof useUsersQuery>;
interface Props {
  data: Pick<Query, 'users'>;
}

export const User: NextPage<Props> = (props) => {
  return (
    <>
      <ul>
        {props.data?.users.map((user: any) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
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
