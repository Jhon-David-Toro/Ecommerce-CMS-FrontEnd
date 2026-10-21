import { beforeEach, describe, expect, it } from "vitest";

import { subscribe, subscriberRepository } from "./newsletter.api";

describe("subscribe", () => {
  beforeEach(() => window.localStorage.clear());

  it("stores the email in lower case", async () => {
    expect(await subscribe(" Ana@Mail.test ")).toBe(true);
    expect((await subscriberRepository.list())[0].email).toBe("ana@mail.test");
  });

  it("does not add the same email twice", async () => {
    await subscribe("ana@mail.test");
    expect(await subscribe("ANA@mail.test")).toBe(false);
    expect(await subscriberRepository.list()).toHaveLength(1);
  });
});
