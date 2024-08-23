"use client";

import {
  Input,
  InputGroup,
  IconButton,
  Select,
  Flex,
  InputProps,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchBar = ({ placeholder = "Search..." }: InputProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <Flex
      boxShadow="0 0 3px 0px #a9a9a9"
      borderRadius="40px"
      w="100%"
      maxW={540}
    >
      <Select
        placeholder="Select"
        border="none"
        borderLeftRadius="40px"
        w="120px"
        h="50px"
        bgColor="backgroundTitle"
        _focusVisible={{ borderColor: "transparent" }}
      >
        <option value="option1">Title</option>
        <option value="option2">Author</option>
      </Select>
      <InputGroup size="md">
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          pr="18px"
          h="50px"
          border="none"
          borderRightRadius="40px"
          borderLeftRadius="inherit"
          _placeholder={{ color: "gray.500" }}
        />
        <IconButton
          aria-label="Search"
          h="100%"
          minW="60px"
          icon={<SearchIcon w="20px" height="20px" />}
          position="absolute"
          right="0"
          top="0"
          bottom="0"
          onClick={handleSearch}
          variant="outline"
          border="none"
          outline="none"
          boxShadow="none"
          bg="transparent"
          _hover={{ bg: "transparent" }}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
