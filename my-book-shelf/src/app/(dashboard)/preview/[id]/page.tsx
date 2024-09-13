"use client";

import { useSession } from "next-auth/react";
import { Box, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  getBookById,
  getUserById,
  updateBookById,
  updateUserById,
} from "@app/api-request";
import { formatDate } from "@app/utils";
import { CheckIcon, StarFullIcon } from "@app/assets/icons";
import { previewAuthor } from "@app/assets/images";
import { Button, LoadingIndicator } from "@app/components/common";
import { ModalSuccessProcess, StatusBook } from "@app/components";
import { BookType, User } from "@app/models";
import { useEffect, useState } from "react";

interface PreviewBookProps {
  params: {
    id: string;
  };
}

const PreviewBook = ({ params: { id } }: PreviewBookProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const [dataBook, setDataBook] = useState<BookType>();
  const [dataUserById, setDataUserById] = useState<User>();

  const fetchData = async () => {
    const book = await getBookById(id);
    setDataBook(book as BookType);
    const user = (await getUserById(session?.user?.id || "")) as User;
    setDataUserById(user);
  };

  useEffect(() => {
    fetchData();
  }, [id, session?.user?.id]);

  const handleAddBorrowBook = async (id: string) => {
    if (dataUserById?.shelfBooks?.includes(id)) {
      return toast({
        title: "Borrowed book.",
        description: "You borrowed book successful!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    dataUserById?.shelfBooks.push(id);
    await updateBookById(dataBook?.id || "", {
      ...dataBook,
      createdDate: formatDate(new Date()),
    });
    const idUpdate = dataUserById?.id || "";
    await updateUserById(idUpdate, { ...dataUserById });

    return onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    return router.refresh();
  };

  if (!dataBook) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Box p="20px 44px" h="80%">
        <Link href="#" onClick={() => router.back()}>
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
            bgColor="white"
            p="24px 32px"
            borderRadius="10px"
          >
            <Image
              src={dataBook.imageUrl || ""}
              alt="Preview book"
              width={210}
              height={278}
              style={{ margin: "0 auto" }}
              priority
            />
          </Box>
          <Flex flexDir="column" w="100%" maxW={503}>
            <Text size="xxxl">{dataBook.title}</Text>
            <Text my="10px">
              By {dataBook.author},{" "}
              <Text as="span">{dataBook.publicationYear}</Text>
            </Text>
            <Text color="dark.60">{dataBook.edition} edition</Text>

            <Flex my="30px" alignItems="center" gap="19px">
              <Flex gap="10px" alignItems="center">
                <Flex>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarFullIcon key={index} w={14} h={14} />
                  ))}
                </Flex>
                <Text size="md" fontSize="14px" fontWeight={500}>
                  <Text as="span">{dataBook.rating}</Text> Ratings
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
                <StatusBook status={dataUserById?.shelfBooks?.includes(id)} />
              </Flex>
            </Flex>

            <Button
              size="xl"
              text="BORROW"
              isDisabled={dataUserById?.shelfBooks?.includes(id)}
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
            bgColor="white"
            p="30px"
            borderRadius="10px"
            pos="relative"
          >
            <Text size="xl" fontWeight={600} color="brand.90">
              About{" "}
              <Text as="span" size="xl" fontWeight={600} color="dark.90">
                Author
              </Text>
            </Text>
            <Text size="xl" mt="22px" mb="43px">
              {dataBook.author}
            </Text>
            <Text size="sm" lineHeight="16px">
              {dataBook.description}
            </Text>
            <Image
              src={previewAuthor || ""}
              alt="Preview Author"
              width={88}
              height={100}
              style={{ position: "absolute", right: "30%", top: "10%" }}
              priority
            />
          </Box>
        </Flex>
      </Box>
      <ModalSuccessProcess isOpen={isOpen} onClose={handleCloseModal} />
    </>
  );
};

export default PreviewBook;
