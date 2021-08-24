// import type { NextPage } from 'next';
// import Head from 'next/head';
import Link from 'next/link';
import {
  Heading,
  Center,
  Box,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

function Home() {
  return (
    <>
      <Center width="100%" minH="100%">
        <Box width="fit-content">
          <Heading>🪄 Sample App</Heading>
          <UnorderedList marginTop={8}>
            <ListItem>
              <Link href="/user">👬 User</Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Center>
    </>
  );
}

export default Home;
