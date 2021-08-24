import { Flex, Box } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

interface Props {
  children: React.ReactNode;
}

export function BaseLayout({ children }: Props) {
  return (
    <Flex minH="100%" direction="column">
      <Box width="100%">
        <Header />
      </Box>
      <Box as="main" width="100%" flexGrow={1} padding="8">
        {children}
      </Box>
      <Box width="100%">
        <Footer />
      </Box>
    </Flex>
  );
}
