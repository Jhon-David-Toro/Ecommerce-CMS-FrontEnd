import { Button } from "@/components/ui/Button";

import type { OrderCardActionsProps } from "../OrderHistory.types";
import { getExtraButton } from "../OrderHistory.utils";
import styles from "../OrderHistory.module.scss";

/**
 * OrderHistory/ExtraAction: the second button of a card: track a shipped order, cancel a pending one or buy a delivered one again.
 *
 * @param props Component props.
 * @returns The button, or null when the status has no extra action.
 */
export const OrderExtraAction = (props: OrderCardActionsProps) => {
  const button = getExtraButton(props);

  if (!button) return null;

  return (
    <Button
      type="secondary"
      size="medium"
      text={button.text}
      href={button.href}
      onClick={button.onClick}
      typeAttribute="button"
      className={button.danger ? styles.card__danger : undefined}
    />
  );
};
