import Image from "next/image";
import type { FC } from "react";

import { OrderSummary } from "@/components/patterns/OrderSummary";
import { Badge } from "@/components/ui/Badge";
import { ORDER_STATUSES, PAYMENT_METHODS } from "@/lib/orders/order.constants";
import { getDiscountPercent, getStatusTone } from "@/lib/orders/order.utils";
import { formatDate, formatPrice } from "@/lib/shared/format/format";

import { ORDER_IMAGE_SIZE } from "./OrderDetails.constants";
import type { OrderDetailsProps } from "./OrderDetails.types";
import styles from "./OrderDetails.module.scss";

/**
 * OrderDetails: number, status, lines, delivery address, payment method and totals of an order.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @param props.children Extra controls shown under the totals, such as admin actions.
 * @returns The order details.
 */
export const OrderDetails: FC<OrderDetailsProps> = ({ order, children }) => (
  <article className={styles.order}>
    <header className={styles.order__header}>
      <h2 className={styles.order__number}>Order {order.number}</h2>
      <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>
      <p className={styles.order__date}>Placed on {formatDate(new Date(order.createdAt).toISOString())}</p>
    </header>
    <div className={styles.order__layout}>
      <div className={styles.order__main}>
        <ul className={styles.order__items} aria-label="Items">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.color}-${item.size}`} className={styles.order__item}>
              <Image src={item.image} alt={item.name} {...ORDER_IMAGE_SIZE} className={styles.order__image} />
              <div>
                <p className={styles.order__name}>{item.name}</p>
                <p className={styles.order__option}>
                  {item.size} · {item.color} · x{item.quantity}
                </p>
              </div>
              <p className={styles.order__price}>{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
        <section className={styles.order__block} aria-label="Delivery address">
          <h3>Delivery address</h3>
          <p>{order.address.fullName}</p>
          <p>{order.address.street}</p>
          <p>
            {order.address.city}
            {order.address.state && `, ${order.address.state}`} {order.address.postalCode}
          </p>
          <p>{order.address.country}</p>
          <p>{order.address.phone}</p>
          <p>{order.email}</p>
        </section>
        <section className={styles.order__block} aria-label="Payment">
          <h3>Payment</h3>
          <p>{PAYMENT_METHODS[order.paymentMethod]}</p>
          {order.notes && <p>Notes: {order.notes}</p>}
        </section>
      </div>
      <OrderSummary
        totals={{ subtotal: order.subtotal, discount: order.discount, shipping: order.shipping, total: order.total }}
        discountPercent={getDiscountPercent(order.subtotal, order.discount)}
      >
        {children}
      </OrderSummary>
    </div>
  </article>
);
