import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { ROLES } from "@/lib/auth/auth.constants";
import type { PublicUser } from "@/lib/auth/auth.types";
import { formatDate } from "@/lib/shared/format/format";

import { BlockButton } from "./parts/BlockButton";

export const CUSTOMER_COLUMNS: Column<PublicUser>[] = [
  { key: "name", header: "Name", render: (user) => user.name },
  { key: "email", header: "Email", render: (user) => user.email },
  { key: "role", header: "Role", render: (user) => <Badge tone="neutral">{user.role === ROLES.admin ? "Admin" : "Customer"}</Badge> },
  { key: "joined", header: "Joined", render: (user) => formatDate(new Date(user.createdAt).toISOString()) },
  {
    key: "status",
    header: "Status",
    render: (user) => <StatusBadge active={!user.blocked} activeLabel="Active" inactiveLabel="Blocked" inactiveTone="danger" />,
  },
];

/**
 * Builds the last column of the customers table, with the block button.
 *
 * @param onBlockedChange Called with the user id and the new blocked state.
 * @returns The actions column.
 */
export const buildActionsColumn = (onBlockedChange: (id: number, blocked: boolean) => void): Column<PublicUser> => ({
  key: "actions",
  header: "",
  align: "right",
  render: (user) => <BlockButton user={user} onBlockedChange={onBlockedChange} />,
});
