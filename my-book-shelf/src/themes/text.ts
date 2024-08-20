import { defineStyleConfig } from "@chakra-ui/react";

export const Text = defineStyleConfig({
  baseStyle: {
    color: "dark.90",
  },

  sizes: {
    md: {
      fontSize: "md",
      lineHeight: 16,
    },
    lg: {
      fontSize: "lg",
      lineHeight: 18,
    },
    xl: {
      fontSize: "xl",
      lineHeight: 24,
      fontWeight: 400,
    },
  },

  defaultProps: {
    size: "lg",
  },
});
