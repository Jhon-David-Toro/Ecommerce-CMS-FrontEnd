import { TAB_SETTINGS } from "../Account.constants";
import type { AccountTabContentProps } from "../Account.types";
import { AccountOrders } from "./AccountOrders";
import { AccountSettings } from "./AccountSettings";

/**
 * Account/TabContent: the orders or the settings, depending on the open tab.
 *
 * @param props Component props.
 * @param props.tab Label of the open tab.
 * @param props.orders Orders of the customer; null while they load.
 * @param props.user Signed-in customer.
 * @param props.onOrdersChange Reloads the orders after one of them changes.
 * @returns The content of the tab.
 */
export const AccountTabContent = ({ tab, orders, user, onOrdersChange }: AccountTabContentProps) =>
  tab === TAB_SETTINGS ? <AccountSettings user={user} /> : <AccountOrders orders={orders} onOrdersChange={onOrdersChange} />;
