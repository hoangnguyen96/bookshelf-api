"use client";

import { useCallback, useMemo, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { HeartIconFull, HeartIconOutline } from "@app/assets/icons";

const IconHeart = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const iconHeart = useCallback(
    () => (isSelected ? <HeartIconFull /> : <HeartIconOutline />),
    [isSelected]
  );

  const colorHeart = useMemo(
    () => (isSelected ? "red.500" : "gray.500"),
    [isSelected]
  );

  return (
    <IconButton
      aria-label="Heart icon"
      icon={iconHeart()}
      onClick={handleClick}
      variant="unstyled"
      fontSize="xl"
      color={colorHeart}
    />
  );
};

export default IconHeart;
