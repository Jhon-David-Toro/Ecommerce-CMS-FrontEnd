import { vi } from "vitest";
import React from "react";
import { ImageProps } from "next/image";

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, alt, ...rest } = props;
    return React.createElement('img', { src: String(src), alt, ...rest });
  },
}));