"use client";

import { getBookById, updateBookById } from "@app/api-request";
import { FormContribute } from "@app/components";
import { LoadingIndicator } from "@app/components/common";
import { BookType } from "@app/models";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ContributeUpdate = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataBookById, setDataBookById] = useState<BookType>();
  const router = useRouter();
  const toast = useToast();

  const fetchData = async () => {
    try {
      const book = await getBookById(params.id);
      setDataBookById(book as BookType);
    } catch (error) {
      console.error("Failed to fetch book data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const handleUpdate = async (id: string, values: Partial<BookType>) => {
    setIsLoading(true);
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

    await updateBookById(id, payload);
    toast({
      title: "Update book successful",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setIsLoading(false);

    return router.refresh();
  };

  if (isLoading || !dataBookById) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <Text size="xl" color="dark.100" mb="34px">
        Preview Book Details
      </Text>
      <FormContribute
        isLoading={isLoading}
        itemUpdate={dataBookById}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};

export default ContributeUpdate;
