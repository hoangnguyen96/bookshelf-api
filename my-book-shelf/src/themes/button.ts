import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "normal",
    borderRadius: "5px",
    color: "white",
    bgColor: "brand.80",
  },

  sizes: {
    sm: {
      h: "30px",
      fontSize: "md",
      fontWeight: 400,
      px: "12px",
      py: "6px",
    },
    md: {
      h: "40px",
      fontSize: "md",
      fontWeight: 600,
      px: "16px",
      py: "10px",
    },
    lg: {
      h: "48px",
      fontSize: "lg",
      fontWeight: 700,
    },
    xl: {
      h: "60px",
      fontSize: "xl",
      fontWeight: 600,
      minW: "200px",
      px: "12px",
      py: "6px",
    },
  },

  variants: {
    normal: {
      minW: "200px",
      boxShadow: "0 0 2px 2px #efdfde",
      _hover: { bgColor: "brand.70" },
    },
    outline: {
      bgColor: "white",
      color: "brand.70",
      borderColor: "brand.70",
      boxShadow: "0 0 2px 2px #efdfde",
    },
    full: {
      width: "100%",
      fontWeight: 600,
      boxShadow: "0 0 2px 2px #efdfde",
      _hover: { bgColor: "brand.70" },
    },
  },
});
