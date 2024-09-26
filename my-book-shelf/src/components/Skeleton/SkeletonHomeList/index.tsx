"use client";

import { Grid, Skeleton } from "@chakra-ui/react";
import { memo } from "react";

const SkeletonHomeList = () => (
  <Grid p="70px 44px" gridTemplateColumns="repeat(6, 1fr)" gap="40px 10px">
    {Array.from({ length: 12 }, (_, index) => (
      <Skeleton key={index} w={160} h={260} borderRadius="10px" />
    ))}
  </Grid>
);

export default memo(SkeletonHomeList);
