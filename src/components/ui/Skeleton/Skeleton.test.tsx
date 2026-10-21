import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders an empty placeholder block", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toBeEmptyDOMElement();
  });
});
