import type { SubmitEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { createSubmitHandler } from "./submit";

/**
 * Builds a fake submit event.
 *
 * @returns An event with a spy on `preventDefault`.
 */
const buildEvent = () =>
  ({ preventDefault: vi.fn() }) as unknown as SubmitEvent<HTMLFormElement> & { preventDefault: ReturnType<typeof vi.fn> };

describe("createSubmitHandler", () => {
  it("sends valid values and clears the errors", () => {
    const onValid = vi.fn();
    const setErrors = vi.fn();
    const event = buildEvent();
    createSubmitHandler({ values: { name: "Ana" }, validate: () => ({}), setErrors, onValid })(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(setErrors).toHaveBeenCalledWith({});
    expect(onValid).toHaveBeenCalledWith({ name: "Ana" });
  });

  it("reports errors and does not send invalid values", () => {
    const onValid = vi.fn();
    const setErrors = vi.fn();
    createSubmitHandler({ values: { name: "" }, validate: () => ({ name: "Required" }), setErrors, onValid })(buildEvent());
    expect(setErrors).toHaveBeenCalledWith({ name: "Required" });
    expect(onValid).not.toHaveBeenCalled();
  });
});
