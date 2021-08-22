import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BASE_URL } from '../client';
import { defaultExchanges } from 'urql';
import { withUrqlClient } from 'next-urql';
import { devtoolsExchange } from '@urql/devtools';
import type { AppProps } from 'next/app';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #__next': {
        height: '100%',
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withUrqlClient(() => {
  return {
    url: BASE_URL,
    exchanges: [devtoolsExchange, ...defaultExchanges],
  };
})(MyApp);
