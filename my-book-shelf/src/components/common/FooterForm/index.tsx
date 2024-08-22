import { Box, StyleProps, Text } from "@chakra-ui/react";
import Link from "next/link";

interface FooterFormProps extends StyleProps {
  text: string;
  textLink: string;
}
const FooterForm = ({ text, textLink, ...rest }: FooterFormProps) => (
  <Box pb="160px" {...rest}>
    <Text as="span">
      {text}{" "}
      <Link href="/" style={{ textDecoration: "underline" }}>
        {textLink}
      </Link>
    </Text>
  </Box>
);

export default FooterForm;
