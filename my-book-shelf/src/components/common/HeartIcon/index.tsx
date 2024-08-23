"use client";

import { useCallback, useMemo, useState } from "react";
import { IconButton, StyleProps } from "@chakra-ui/react";
import { HeartIconFull, HeartIconOutline } from "@app/assets/icons";

const IconHeart = ({ ...rest }: StyleProps) => {
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
      minW={30}
      minH={30}
      {...rest}
    />
  );
};

export default IconHeart;
