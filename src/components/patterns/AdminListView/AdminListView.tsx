import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Pagination } from "@/components/patterns/Pagination";
import { TableToolbar } from "@/components/patterns/TableToolbar";

import type { AdminListViewProps } from "./AdminListView.types";

/**
 * AdminListView: an admin list page made of a header, a search box with filters, a table, pagination and room for dialogs.
 *
 * @param props Component props.
 * @param props.title Headline of the page.
 * @param props.description Short explanation under the title.
 * @param props.actions Buttons shown beside the title.
 * @param props.searchLabel Hint and accessible name of the search box.
 * @param props.filters Extra filters shown beside the search box.
 * @param props.controls Search text, page and rows of the current page.
 * @param props.table Caption, columns and row keys of the table.
 * @param props.children Dialogs or notes shown after the table.
 * @returns The page content.
 */
export const AdminListView = <T,>({
  title,
  description,
  actions,
  searchLabel,
  filters,
  controls,
  table,
  children,
}: AdminListViewProps<T>) => (
  <>
    <PageHeader title={title} description={description} actions={actions} />
    <TableToolbar query={controls.query} onQueryChange={controls.setQuery} placeholder={searchLabel}>
      {filters}
    </TableToolbar>
    <DataTable {...table} rows={controls.pageRows} />
    {controls.totalPages > 1 && <Pagination currentPage={controls.page} totalPages={controls.totalPages} onPageChange={controls.setPage} />}
    {children}
  </>
);
