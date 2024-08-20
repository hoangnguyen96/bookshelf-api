import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { Button } from "./button";
import { Text } from "./text";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { fonts, fontSizes, lineHeights, radius } from "./typography";

export const theme = extendTheme({
  colors,
  spacing,
  fonts,
  fontSizes,
  lineHeights,
  radius,
  components: {
    Button,
    Text,
    Input,
    Checkbox,
  },
});

export default theme;
