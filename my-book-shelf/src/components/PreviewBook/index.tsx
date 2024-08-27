"use client";

import { ROUTES } from "@app/constants";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { book1, previewAuthor } from "@app/assets/images";
import { CheckIcon, StarFullIcon } from "@app/assets/icons";
import { Button } from "../common";
import { BookType, User } from "@app/models";
import { useEffect, useState } from "react";
import { HttpClient } from "@app/services";

const PreviewBook = () => {
  const [book, setBook] = useState<BookType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await HttpClient.get<BookType[]>(`/books?id=${3}`);

        setBook(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const [foundBook] = book || [];
  const {
    title,
    author,
    publicationYear,
    edition,
    rating,
    description,
    imageUrl,
    status,
  } = foundBook;
  console.log("dataBook:", foundBook);

  return (
    <Box p="20px 44px" h="100%" maxHeight={418}>
      <Link href={ROUTES.SEARCH}>
        <ArrowBackIcon w={5} h={5} />
        <Text as="span" ml="9px">
          Back to results
        </Text>
      </Link>
      <Flex gap="76px" mt="20px" h="100%" justifyContent="space-between">
        <Box
          maxW={274}
          width="100%"
          height="100%"
          bgColor="white"
          p="24px 32px"
          borderRadius="10px"
        >
          <Image
            src={book1}
            alt="Preview book"
            width={210}
            height={278}
            style={{ margin: "0 auto" }}
          />
        </Box>
        <Flex flexDir="column" w="100%" maxW={503}>
          <Text size="xxxl">Don’t Make Me Think </Text>
          <Text my="10px">
            By Steve Krug, <Text as="span">2000</Text>
          </Text>
          <Text color="dark.60">Second Edition</Text>

          <Flex my="30px" alignItems="center" gap="19px">
            <Flex gap="10px" alignItems="center">
              <Flex>
                {Array.from({ length: 5 }, (_, index) => (
                  <StarFullIcon key={index} w={14} h={14} />
                ))}
              </Flex>
              <Text size="md" fontSize="14px" fontWeight={500}>
                <Text as="span">5.0</Text> Ratings
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
              <Box w={85} height={26} bgColor="green.100" borderRadius="5px">
                <Text
                  size="md"
                  color="white"
                  lineHeight="26px"
                  textAlign="center"
                >
                  In-Shelf
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Button size="xl" text="BORROW" maxW={210} mt="43px" />
        </Flex>
        <Box
          maxW={445}
          width="100%"
          height="100%"
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
            Steve Krug
          </Text>
          <Text size="sm" lineHeight="16px">
            Steve Krug is a usability consultant who has more than 30 years of
            experience as a user advocate for companies like Apple, Netscape,
            AOL, Lexus, and others. Based in part on the success of his first
            book, Don't Make Me Think, he has become a highly sought-after
            speaker on usability design.
          </Text>
          <Image
            src={previewAuthor}
            alt="Preview Author"
            width={88}
            height={100}
            style={{ position: "absolute", right: "120px", top: "30px" }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default PreviewBook;
