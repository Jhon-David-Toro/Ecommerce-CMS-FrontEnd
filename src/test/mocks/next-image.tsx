import { ImageProps } from "next/image";
import React from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, alt, ...rest } = props;
    return React.createElement("img", { src: String(src), alt, ...rest });
  },
}));
