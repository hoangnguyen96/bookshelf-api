import { IconProps } from "@chakra-ui/react";

export const StarFullIcon: React.FC<IconProps> = ({ color = "#dfb300" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color as string}
    width="18px"
    height="18px"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
