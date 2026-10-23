export interface RowActionsProps {
  name: string;
  onEdit?: () => void;
  editHref?: string;
  onDelete: () => void;
}
