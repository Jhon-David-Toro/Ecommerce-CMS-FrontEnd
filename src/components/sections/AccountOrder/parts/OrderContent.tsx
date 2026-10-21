import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

import type { OrderContentProps } from "../AccountOrder.types";
import styles from "../AccountOrder.module.scss";

/**
 * AccountOrder/Content: breadcrumb and details of one order.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @returns The content.
 */
export const OrderContent = ({ order }: OrderContentProps) => (
  <section className={styles.order}>
    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My account", href: "/account" }, { label: order.number }]} />
    <OrderDetails order={order} />
  </section>
);
