import { ActionEmptyState } from "@/components/patterns/ActionEmptyState";
import { Spinner } from "@/components/ui/Spinner";

import type { RecordGateProps } from "./RecordGate.types";

/**
 * RecordGate: shows a spinner while a record loads, a not found message when it does not exist, and the content once it does.
 *
 * @param props Component props.
 * @param props.record The loaded record; null or undefined when it does not exist.
 * @param props.isLoading Whether the record is still loading.
 * @param props.loadingLabel Accessible name of the spinner.
 * @param props.notFound Texts and link of the not found message.
 * @param props.children Draws the content from the loaded record.
 * @returns The spinner, the not found message or the content.
 */
export const RecordGate = <T,>({ record, isLoading, loadingLabel, notFound, children }: RecordGateProps<T>) => {
  if (isLoading) return <Spinner label={loadingLabel} />;
  if (!record) {
    return (
      <ActionEmptyState
        title={notFound.title}
        description={notFound.description}
        actionLabel={notFound.backLabel}
        actionHref={notFound.backHref}
      />
    );
  }

  return <>{children(record)}</>;
};
