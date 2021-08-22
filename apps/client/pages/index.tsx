import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import {
  Heading,
  Center,
  Box,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const Home: NextPage = () => {
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
};

export default Home;
