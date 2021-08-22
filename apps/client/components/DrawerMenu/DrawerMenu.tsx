import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';

interface Props {
  isOpen: boolean;
  finalFocusRef?: React.RefObject<FocusableElement>;
}

export const DrawerMenu: React.FC<Props> = ({ isOpen, finalFocusRef }) => {
  const { onClose } = useDisclosure();

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      finalFocusRef={finalFocusRef}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <p>hoge</p>
          <Button onClick={onClose}>hoge</Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
