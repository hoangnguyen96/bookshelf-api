"use client";

import {
  Box,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Button } from "../common";
import { CheckIcon } from "@app/assets/icons";

interface ModalSuccessProcessProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ModalSuccessProcess = ({
  isOpen = false,
  onClose,
}: ModalSuccessProcessProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="165px 120px 65px" minW={484} alignItems="center">
        <ModalHeader textAlign="center">Process Completed</ModalHeader>

        <Box mt="165px" mb="200px">
          <CheckIcon />
        </Box>

        <ModalFooter>
          <Button onClick={onClose} text="Back" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSuccessProcess;