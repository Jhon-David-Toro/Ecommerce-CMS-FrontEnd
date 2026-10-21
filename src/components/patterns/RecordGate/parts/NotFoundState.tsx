import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

import type { NotFoundConfig } from "../RecordGate.types";

/**
 * RecordGate/NotFoundState: message shown when a record does not exist, with a link back.
 *
 * @param props Component props.
 * @param props.title Headline of the message.
 * @param props.description Sentence that explains what happened.
 * @param props.backLabel Text of the link back.
 * @param props.backHref Address of the link back.
 * @returns The message.
 */
export const NotFoundState = ({ title, description, backLabel, backHref }: NotFoundConfig) => (
  <EmptyState
    title={title}
    description={description}
    action={<Button type="primary" size="medium" text={backLabel} href={backHref} typeAttribute="button" />}
  />
);
