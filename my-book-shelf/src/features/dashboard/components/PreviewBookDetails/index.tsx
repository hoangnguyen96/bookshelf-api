"use client";

import { memo, useState } from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { BookType, User } from "@app/interface";
import { updateBookById, updateUserById } from "../../actions";
import { useRouter } from "next/navigation";
import { CheckIcon, StarFullIcon } from "@app/assets/icons";
import { previewAuthor } from "@app/assets/images";
import { Button } from "@app/components/common";
import { StatusBook } from "@app/components";
import dynamic from "next/dynamic";
import { MESSAGES } from "@app/constants";
import isEqual from "react-fast-compare";

const ModalSuccessProcess = dynamic(
  () => import("@app/components").then((mod) => mod.ModalSuccessProcess),
  {
    ssr: false,
  }
);

interface PreviewBookDetailsProps {
  user: User;
  book: BookType;
}

const PreviewBookDetailsComponent = ({
  user,
  book,
}: PreviewBookDetailsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleAddBorrowBook = async (id: string) => {
    try {
      setIsLoading(true);
      user?.shelfBooks.push(id);
      await updateBookById(book?.id, {
        ...book,
        createdDate: new Date().toISOString(),
      });
      const idUpdate = user?.id;
      await updateUserById(idUpdate, { ...user });

      return onOpen();
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return MESSAGES.RESPONSE_ERROR;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickBack = () => {
    return router.back();
  };

  const handleCloseModal = () => {
    onClose();
    return router.refresh();
  };

  const {
    id,
    title,
    author,
    description,
    rating,
    imageUrl,
    publicationYear,
    edition,
  } = book || {};

  return (
    <>
      <Box p="20px 44px" h="80%">
        <Link href="#" data-testid="click-back" onClick={handleClickBack}>
          <ArrowBackIcon w={5} h={5} />
          <Text as="span" ml="9px">
            Back to results
          </Text>
        </Link>
        <Flex gap="76px" mt="20px" h="100%" justifyContent="space-between">
          <Box
            maxW={274}
            width="100%"
            height={405}
            bgColor="var(--chakra-colors-chakra-body-bg)"
            p="24px 32px"
            borderRadius="10px"
          >
            <Image
              src={imageUrl || "https://i.ibb.co/Lt7GmF2/place-holder.webp"}
              alt="Preview book"
              width={210}
              height={278}
              style={{ margin: "0 auto" }}
              priority={true}
              fetchPriority="high"
            />
          </Box>
          <Flex flexDir="column" w="100%" maxW={503}>
            <Text size="xxxl">{title}</Text>
            <Text my="10px">
              By {author},{" "}
              <Text as="span" color="colorDescription">
                {publicationYear}
              </Text>
            </Text>
            <Text color="colorDescription">{edition} edition</Text>

            <Flex my="30px" alignItems="center" gap="19px">
              <Flex gap="10px" alignItems="center">
                <Flex>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarFullIcon key={index} w={14} h={14} />
                  ))}
                </Flex>
                <Text size="md" fontSize="14px" fontWeight={500}>
                  <Text as="span">{rating}</Text> Ratings
                </Text>
              </Flex>
              <Text size="md" fontSize="14px" fontWeight={500}>
                <Text as="span">25</Text> Currently reading
              </Text>
              <Text size="md" fontSize="14px" fontWeight={500}>
                <Text as="span">119</Text> Have read
              </Text>
            </Flex>

            <Flex gap="18px">
              <Flex flexDir="column" w="100%" maxW={132} gap="10px">
                <Text fontSize="14px" fontWeight={700}>
                  Availability
                </Text>
                <Flex gap="8px" alignItems="center">
                  <CheckIcon width="15px" height="15px" />
                  <Text>Hard Copy</Text>
                </Flex>
                <Flex gap="8px" alignItems="center">
                  <CheckIcon width="15px" height="15px" />
                  <Text>E - Book</Text>
                </Flex>
                <Flex gap="8px" alignItems="center">
                  <CheckIcon width="15px" height="15px" />
                  <Text>Audio book</Text>
                </Flex>
              </Flex>
              <Flex flexDir="column" w="100%" gap="16px" maxW={132}>
                <Text fontSize="14px" fontWeight={700}>
                  Status
                </Text>
                <StatusBook status={user?.shelfBooks?.includes(id)} />
              </Flex>
            </Flex>

            <Button
              size="xl"
              text="BORROW"
              isLoading={isLoading}
              isDisabled={user?.shelfBooks?.includes(id)}
              maxW={210}
              mt="43px"
              lineHeight="60px"
              onClick={() => handleAddBorrowBook(id)}
            />
          </Flex>
          <Box
            maxW={445}
            width="100%"
            height={418}
            bgColor="var(--chakra-colors-chakra-body-bg)"
            p="30px"
            borderRadius="10px"
            pos="relative"
          >
            <Text size="xl" fontWeight={600} color="colorButton">
              About{" "}
              <Text as="span" size="xl" fontWeight={600} color="dark.90">
                Author
              </Text>
            </Text>
            <Text size="xl" mt="22px" mb="43px">
              {author}
            </Text>
            <Text size="sm" lineHeight="16px">
              {description}
            </Text>
            <Image
              src={previewAuthor}
              alt="Preview Author"
              width={88}
              height={100}
              style={{ position: "absolute", right: "30%", top: "10%" }}
              priority={true}
              fetchPriority="high"
            />
          </Box>
        </Flex>
      </Box>
      <ModalSuccessProcess isOpen={isOpen} onClose={handleCloseModal} />
    </>
  );
};

const areEqual = (
  prevProps: PreviewBookDetailsProps,
  nextProps: PreviewBookDetailsProps
) => {
  return (
    isEqual(prevProps.user, nextProps.user) &&
    isEqual(prevProps.book, nextProps.book)
  );
};

export const PreviewBookDetails = memo(PreviewBookDetailsComponent, areEqual);
