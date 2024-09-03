"use client";

import { useSession } from "next-auth/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { getUserById, updateUserById } from "@app/api";
import { User } from "@app/models";
import { FormProfile, UploadImage } from "@app/components/common";
import { TopContent } from "@app/components";

const ProfilePage = async () => {
  const { data: session } = useSession();
  const dataUserById = (await getUserById(session?.user?.id || "")) as User;

  const handleUpdateUser = async (id: string, user: Partial<User>) => {
    const { username, email, phone, bio } = user;

    const payload: Partial<User> = {
      ...user,
      username,
      email,
      phone,
      bio,
    };

    return await updateUserById(id, payload);
  };

  return (
    <>
      <TopContent isSearch={false} />
      <Flex
        flexDir="column"
        bgColor="white"
        borderRadius="10px"
        width="100%"
        maxW={1136}
        ml="44px"
        mt="4px"
        mb="20px"
        p="48px 24px 24px"
        boxShadow="0 0 5px 1px rgb(0 0 0 / 10%)"
      >
        <Text size="xl" color="brand.80" fontWeight={700}>
          Account Setting
        </Text>
        <Flex
          flexDir="column"
          alignItems="center"
          alignSelf="flex-start"
          mt="50px"
        >
          <Text>Your Profile Picture</Text>
          <Box mt="17px">
            <UploadImage
              image={session?.user?.image || ""}
              user={dataUserById}
            />
          </Box>
        </Flex>
        <FormProfile user={dataUserById} onUpdate={handleUpdateUser} />
      </Flex>
    </>
  );
};

export default ProfilePage;
