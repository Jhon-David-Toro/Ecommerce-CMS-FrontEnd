import type { FC } from "react";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

import type { ActionEmptyStateProps } from "./ActionEmptyState.types";

/**
 * ActionEmptyState: an empty or not found message with a button that leads somewhere useful.
 *
 * @param props Component props.
 * @param props.title Headline of the message.
 * @param props.description Sentence that explains what happened.
 * @param props.actionLabel Text of the button.
 * @param props.actionHref Address of the button.
 * @returns The message.
 */
export const ActionEmptyState: FC<ActionEmptyStateProps> = ({ title, description, actionLabel, actionHref }) => (
  <EmptyState
    title={title}
    description={description}
    action={<Button type="primary" size="medium" text={actionLabel} href={actionHref} typeAttribute="button" />}
  />
);
