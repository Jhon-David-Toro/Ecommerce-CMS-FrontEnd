import type { FC } from "react";

import { CANCEL_LABEL, STATUS_ICONS } from "./OrderActions.constants";
import type { OrderActionsProps } from "./OrderActions.types";
import { getActions } from "./OrderActions.utils";
import { OrderActionButton } from "./parts/OrderActionButton";
import styles from "./OrderActions.module.scss";

/**
 * OrderActions: buttons that move an order forward (confirm payment, ship, deliver) or cancel it.
 *
 * @param props Component props.
 * @param props.order Order to act on.
 * @param props.onChange Called with the order id and the status to move to.
 * @param props.compact Shows text-only buttons, for table rows.
 * @returns The buttons, or nothing for an order that is finished.
 */
export const OrderActions: FC<OrderActionsProps> = ({ order, onChange, compact = false }) => (
  <div className={styles.actions}>
    {getActions(order.status, CANCEL_LABEL).map((action) => (
      <OrderActionButton
        key={action.to}
        label={action.label}
        icon={STATUS_ICONS[action.to]}
        tone={action.to === "cancelled" ? "danger" : "primary"}
        compact={compact}
        onClick={() => onChange(order.id, action.to)}
      />
    ))}
  </div>
);
