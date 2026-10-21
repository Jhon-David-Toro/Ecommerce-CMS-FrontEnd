import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { useClickOutside } from "./useClickOutside";
import { useEscKey } from "./useEscKey";
import { useWindowWidth } from "./useWindowWidth";

describe("useClickOutside", () => {
  it("calls the handler for presses outside the element only", () => {
    const handler = vi.fn();
    /**
     * Test host that wires the hook to one of its two paragraphs.
     *
     * @returns The inside and outside paragraphs.
     */
    const Host = () => {
      const ref = useRef<HTMLParagraphElement>(null);
      useClickOutside(ref, handler);
      return (
        <>
          <p ref={ref}>inside</p>
          <p>outside</p>
        </>
      );
    };
    const { getByText } = render(<Host />);

    fireEvent.mouseDown(getByText("inside"));
    expect(handler).not.toHaveBeenCalled();
    fireEvent.mouseDown(getByText("outside"));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe("useEscKey", () => {
  it("calls the handler on Escape", () => {
    const handler = vi.fn();
    renderHook(() => useEscKey(null, handler));
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.keyDown(document, { key: "Enter" });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does nothing while inactive", () => {
    const handler = vi.fn();
    renderHook(() => useEscKey(null, handler, false));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handler).not.toHaveBeenCalled();
  });

  it("ignores Escape when the focus is outside the scope", () => {
    const handler = vi.fn();
    const scope = document.createElement("div");
    renderHook(() => useEscKey({ current: scope }, handler));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handler).not.toHaveBeenCalled();
  });
});

describe("useWindowWidth", () => {
  it("follows the window width", () => {
    const { result } = renderHook(() => useWindowWidth());
    const initial = result.current;
    act(() => {
      window.innerWidth = initial + 100;
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe(initial + 100);
  });
});
