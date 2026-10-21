import { createRepository } from "@/lib/mock/repository";

import { SUBSCRIBER_STORAGE_KEY } from "./newsletter.constants";
import type { Subscriber } from "./newsletter.types";

export const subscriberRepository = createRepository<Subscriber>(SUBSCRIBER_STORAGE_KEY, () => []);

/**
 * Adds an email to the newsletter list; an email that is already there is not added twice.
 *
 * @param email Email of the subscriber.
 * @returns True when the email was added, false when it was already subscribed.
 */
export const subscribe = async (email: string) => {
  const normalized = email.trim().toLowerCase();
  const exists = (await subscriberRepository.list()).some((subscriber) => subscriber.email === normalized);
  if (!exists) await subscriberRepository.create({ email: normalized, createdAt: Date.now() });
  return !exists;
};
