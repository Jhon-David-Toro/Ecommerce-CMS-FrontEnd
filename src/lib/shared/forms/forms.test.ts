import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useFormValues } from "./useFormValues";
import { compact, email, minLength, minNumber, required } from "./validators";

describe("validators", () => {
  it("requires text", () => {
    expect(required("  ")).toBe("This field is required.");
    expect(required("a")).toBeUndefined();
    expect(required("", "Custom")).toBe("Custom");
  });

  it("checks emails", () => {
    expect(email("ana@mail.test")).toBeUndefined();
    expect(email("ana@")).toBe("Enter a valid email address.");
  });

  it("checks numbers and lengths", () => {
    expect(minNumber("5", 1)).toBeUndefined();
    expect(minNumber("0", 1)).toBe("Must be 1 or more.");
    expect(minNumber("", 0)).toBe("Must be 0 or more.");
    expect(minLength("abc", 3)).toBeUndefined();
    expect(minLength("ab", 3)).toBe("Must have at least 3 characters.");
  });

  it("keeps only the fields with an error", () => {
    expect(compact({ a: undefined, b: "bad" })).toEqual({ b: "bad" });
  });
});

describe("useFormValues", () => {
  it("connects a text field to the values", () => {
    const { result } = renderHook(() => useFormValues({ name: "" }));
    act(() => result.current.field("name").onChange({ target: { value: "Ana" } } as never));
    expect(result.current.values.name).toBe("Ana");
    expect(result.current.field("name").value).toBe("Ana");
  });

  it("clears the error of a field when it changes", () => {
    const { result } = renderHook(() => useFormValues({ name: "" }));
    act(() => result.current.setErrors({ name: "Required" }));
    act(() => result.current.setField("name", "x"));
    expect(result.current.errors.name).toBe("");
  });

  it("resets to the initial values", () => {
    const { result } = renderHook(() => useFormValues({ name: "a" }));
    act(() => result.current.setField("name", "b"));
    act(() => result.current.reset());
    expect(result.current.values.name).toBe("a");
  });
});
