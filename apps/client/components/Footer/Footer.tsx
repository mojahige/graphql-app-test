import { Box, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box as="footer" bg="gray.200" padding="8px">
      <Text fontWeight={700} textAlign="center">
        <Box as="small">🤡 copyright 🤡</Box>
      </Text>
    </Box>
  );
}
