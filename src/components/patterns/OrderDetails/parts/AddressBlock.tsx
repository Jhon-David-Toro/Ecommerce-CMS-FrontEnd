import type { AddressBlockProps } from "../OrderDetails.types";
import { formatCityLine } from "../OrderDetails.utils";
import styles from "../OrderDetails.module.scss";

/**
 * OrderDetails/AddressBlock: delivery address and contact details of an order.
 *
 * @param props Component props.
 * @param props.address Delivery address.
 * @param props.email Email of the customer.
 * @returns The block.
 */
export const AddressBlock = ({ address, email }: AddressBlockProps) => (
  <section className={styles.order__block} aria-label="Delivery address">
    <h3>Delivery address</h3>
    <p>{address.fullName}</p>
    <p>{address.street}</p>
    <p>{formatCityLine(address)}</p>
    <p>{address.country}</p>
    <p>{address.phone}</p>
    <p>{email}</p>
  </section>
);
