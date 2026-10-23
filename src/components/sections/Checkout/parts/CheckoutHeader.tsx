import { CheckoutSteps } from "@/components/patterns/CheckoutSteps";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { CHECKOUT_TRAIL, DETAILS_STEP } from "../Checkout.constants";
import styles from "../Checkout.module.scss";

/**
 * Checkout/Header: breadcrumb, title and progress of the checkout page.
 *
 * @returns The header.
 */
export const CheckoutHeader = () => (
  <>
    <Breadcrumb items={CHECKOUT_TRAIL} />
    <h1 className={styles.checkout__title}>CHECKOUT</h1>
    <CheckoutSteps current={DETAILS_STEP} />
  </>
);
