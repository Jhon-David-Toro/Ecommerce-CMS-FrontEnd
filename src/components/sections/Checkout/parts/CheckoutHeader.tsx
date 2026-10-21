import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { CHECKOUT_TRAIL } from "../Checkout.constants";
import styles from "../Checkout.module.scss";

/**
 * Checkout/Header: breadcrumb and title of the checkout page.
 *
 * @returns The header.
 */
export const CheckoutHeader = () => (
  <>
    <Breadcrumb items={CHECKOUT_TRAIL} />
    <h1 className={styles.checkout__title}>CHECKOUT</h1>
  </>
);
