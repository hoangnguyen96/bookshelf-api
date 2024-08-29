"use client";

import { Cart, FormContribute } from "@app/components/common";
import { ROUTES } from "@app/constants";
import { BookType, User } from "@app/models";
import { HttpClient } from "@app/services";
import { getThreeTopBook } from "@app/utils";
import { Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ContributePage = async () => {
  const { data: session } = useSession();
  const dataUserById = await HttpClient.get<User[]>(
    `/user?userId=${session?.user?.id}`
  );
  const dataBooks = await HttpClient.get<BookType[]>("/books");
  const dataTop = getThreeTopBook(dataBooks);

  const handleSubmit = async (values: Partial<BookType>) => {
    const {
      title,
      author,
      category,
      imageUrl,
      description,
      status,
      publicationYear,
      rating,
      createdDate,
      edition,
    } = values;

    const payload: Partial<BookType> = {
      title,
      author,
      category,
      imageUrl,
      description,
      status,
      publicationYear,
      rating,
      createdDate,
      edition,
    };

    try {
      await HttpClient.post("/books", payload);
    } catch (error) {
      throw new Error("Failed to add books!");
    }
  };

  return (
    <Flex p="100px 68px" gap="56px" height={765}>
      <Flex
        flex={1}
        maxW={678}
        flexDir="column"
        bgColor="white"
        borderRadius="10px"
        p="28px 45px 45px 60px"
      >
        <Text size="xl" color="dark.100" mb="34px">
          Fill up Book Details
        </Text>
        <FormContribute onSubmit={handleSubmit} />
      </Flex>
      <Flex maxW={582} flexDir="column">
        <Text fontSize="50px" lineHeight="64px" fontWeight={700}>
          Your{" "}
          <Text
            as="span"
            color="brand.90"
            fontSize="50px"
            lineHeight="64px"
            fontWeight={700}
          >
            Contribution
          </Text>{" "}
          Helps Other to Learn
        </Text>
        <Flex
          mt="75px"
          mb="30px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text size="xxl" fontWeight={400}>
            Your Previous Contributions
          </Text>
          <Link href={ROUTES.CONTRIBUTE_LIST}>
            <Text as="span" ml="9px" color="dark.60">
              Show All
            </Text>
          </Link>
        </Flex>

        <Flex gap="39px" justifyContent="space-between">
          {dataTop.map((item: BookType) => {
            const { id, title, author, imageUrl, publicationYear, rating } =
              item;

            return (
              <Cart
                key={id}
                title={title}
                author={author}
                imageUrl={imageUrl}
                publicationYear={publicationYear}
                rating={rating}
                isFavorite={dataUserById[0]?.favorites?.includes(id) || false}
                isContribute={true}
              />
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContributePage;
