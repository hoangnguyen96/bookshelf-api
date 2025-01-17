"use client";

import { IconProps } from "@chakra-ui/react";

export const CheckIcon: React.FC<IconProps> = ({
  width = "140px",
  height = "140px",
}) => (
  <svg
    width={width as string}
    height={height as string}
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M70 0C31.3317 0 0 31.3317 0 70C0 108.668 31.3317 140 70 140C108.668 140 140 108.668 140 70C140 31.3317 108.668 0 70 0ZM59.1971 94.8029C58.3894 95.6106 57.2452 96.2837 56.2356 96.2837C55.226 96.2837 54.0817 95.5769 53.2404 94.7692L34.3942 75.9231L40.3846 69.9327L56.2692 85.8173L98.2692 43.5144L104.159 49.6058L59.1971 94.8029Z"
      fill="#4AC156"
    />
  </svg>
);
