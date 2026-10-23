import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { RowActions } from "@/components/patterns/RowActions";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import type { StaticPage } from "@/lib/content/content.types";
import { formatDate } from "@/lib/shared/format/format";

import type { PageColumnHandlers } from "../AdminPages.types";

/**
 * Builds the table columns of the pages list.
 *
 * @param handlers Actions of the Edit and Delete buttons.
 * @param handlers.onEdit Called with the page to edit.
 * @param handlers.onDelete Called with the page to delete.
 * @returns The columns: title, address, update date, status and actions.
 */
export const usePageColumns = ({ onEdit, onDelete }: PageColumnHandlers): Column<StaticPage>[] => [
  { key: "title", header: "Title", render: (page) => page.title },
  { key: "slug", header: "Address", render: (page) => `/p/${page.slug}` },
  { key: "updated", header: "Updated", render: (page) => formatDate(new Date(page.updatedAt).toISOString()) },
  {
    key: "status",
    header: "Status",
    render: (page) => <StatusBadge active={page.published} activeLabel="Published" inactiveLabel="Draft" inactiveTone="warning" />,
  },
  {
    key: "actions",
    header: "",
    align: "right",
    render: (page) => <RowActions name={page.title} onEdit={() => onEdit(page)} onDelete={() => onDelete(page)} />,
  },
];
