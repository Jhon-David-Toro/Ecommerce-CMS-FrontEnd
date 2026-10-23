import { ActionEmptyState } from "@/components/patterns/ActionEmptyState";

import type { EmptyGateProps } from "./EmptyGate.types";

/**
 * EmptyGate: shows an empty message instead of its content when there is nothing to show.
 *
 * @param props Component props.
 * @param props.count How many items there are to show.
 * @param props.empty Texts and link of the empty message.
 * @param props.children Content shown when there is at least one item.
 * @returns The empty message or the content.
 */
export const EmptyGate = ({ count, empty, children }: EmptyGateProps) => (count === 0 ? <ActionEmptyState {...empty} /> : <>{children}</>);
