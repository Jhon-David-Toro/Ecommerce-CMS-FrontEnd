import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { getSettings } from "@/lib/settings/settings.api";
import { DEFAULT_SETTINGS } from "@/lib/settings/settings.constants";

import { AdminSettings } from "./AdminSettings";
import { formatPromoCodes, parsePromoCodes, toFormValues, toSettings, validatePromoCodes, validateSettings } from "./AdminSettings.utils";

describe("AdminSettings", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the saved settings", async () => {
    render(<AdminSettings />);
    expect(await screen.findByLabelText("Store name")).toHaveValue("SHOP.CO");
    expect(screen.getByLabelText("Codes")).toHaveValue("SHOP20 | 20");
  });

  it("saves the changes", async () => {
    render(<AdminSettings />);
    const name = await screen.findByLabelText("Store name");
    await userEvent.clear(name);
    await userEvent.type(name, "My Shop");
    await userEvent.click(screen.getByRole("button", { name: "Save settings" }));
    expect(await screen.findByText("Settings saved.")).toBeInTheDocument();
    expect((await getSettings()).storeName).toBe("My Shop");
  });

  it("does not save invalid values", async () => {
    render(<AdminSettings />);
    const email = await screen.findByLabelText("Contact email");
    await userEvent.clear(email);
    await userEvent.type(email, "nope");
    await userEvent.click(screen.getByRole("button", { name: "Save settings" }));
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.queryByText("Settings saved.")).not.toBeInTheDocument();
    expect((await getSettings()).contactEmail).toBe(DEFAULT_SETTINGS.contactEmail);
  });
});

describe("AdminSettings utils", () => {
  it("round-trips promo codes", () => {
    const codes = [{ code: "SHOP20", percent: 20 }];
    expect(parsePromoCodes(formatPromoCodes(codes))).toEqual(codes);
  });

  it("upper-cases codes and skips invalid lines", () => {
    expect(parsePromoCodes("save10 | 10\nbad\nbig | 500")).toEqual([{ code: "SAVE10", percent: 10 }]);
  });

  it("reports invalid promo code lines", () => {
    expect(validatePromoCodes("save10 | 10")).toBeUndefined();
    expect(validatePromoCodes("bad")).toMatch(/CODE \| percent/);
  });

  it("converts settings to form values and back", () => {
    expect(toSettings(toFormValues(DEFAULT_SETTINGS))).toEqual(DEFAULT_SETTINGS);
  });

  it("validates required and numeric fields", () => {
    const errors = validateSettings({ ...toFormValues(DEFAULT_SETTINGS), storeName: "", shippingFee: "-1" });
    expect(Object.keys(errors).sort()).toEqual(["shippingFee", "storeName"]);
  });
});
