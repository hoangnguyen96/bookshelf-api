"use client";

import { memo, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { Button } from "..";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const page = searchParams.get("page");

  useEffect(() => {
    if (!page) {
      router.push("?page=1");
    }
  }, [page, router]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap="8px"
      position="absolute"
      left="0"
      right="0"
      bottom="5%"
    >
      <IconButton
        width="30px"
        height="30px"
        size="sm"
        variant="outline"
        color="brand.90"
        bgColor="transparent"
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        icon={<ChevronLeftIcon />}
        minW="auto"
        aria-label={""}
        _focusVisible="none"
        _hover={{ bgColor: "transparent" }}
      />

      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          width="30px"
          height="30px"
          text={`${index + 1}`}
          variant="outline"
          size="sm"
          minW="auto"
          isActive={currentPage === index + 1}
          onClick={() => handlePageChange(index + 1)}
        />
      ))}

      <IconButton
        size="sm"
        width="30px"
        height="30px"
        variant="outline"
        color="brand.90"
        bgColor="transparent"
        minW="auto"
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        icon={<ChevronRightIcon />}
        aria-label={""}
        _focusVisible="none"
        _hover={{ bgColor: "transparent" }}
      />
    </Flex>
  );
};

export default memo(Pagination);
