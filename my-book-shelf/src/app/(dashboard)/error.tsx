"use client";

import { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Button } from "@app/components/common";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Flex>
      <Text>Something went wrong!</Text>
      <Button onClick={() => reset()} text="Try again" />
    </Flex>
  );
};

export default Error;
