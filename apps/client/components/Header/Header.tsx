import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Button,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  List,
  ListItem,
  CloseButton,
  Flex,
} from '@chakra-ui/react';

export function Header() {
  const router = useRouter();
  const drawerContentRef = useRef(null);
  const drawerOpenButtonRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" bg="pink.400" padding="8px 16px">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          as={router.basePath === '/' ? 'h1' : 'p'}
          color="white"
          size="lg"
        >
          <Link href="/">Sample App</Link>
        </Heading>

        <CloseButton
          onClick={onOpen}
          ref={drawerOpenButtonRef}
          border="2px solid white"
          color="white"
        />
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={drawerContentRef}
        finalFocusRef={drawerOpenButtonRef}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <div
              ref={drawerContentRef}
              tabIndex={-1}
              data-hoge="pien"
              aria-hidden="true"
            ></div>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody padding="16px 0">
            <List borderTop="1px solid" borderTopColor="gray.300">
              <ListItem>
                <Link href="/" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    isFullWidth
                    borderRadius={0}
                    justifyContent="left"
                    borderBottom="1px solid"
                    borderBottomColor="gray.300"
                  >
                    Top
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/user" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    isFullWidth
                    borderRadius={0}
                    justifyContent="left"
                    borderBottom="1px solid"
                    borderBottomColor="gray.300"
                  >
                    User
                  </Button>
                </Link>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
