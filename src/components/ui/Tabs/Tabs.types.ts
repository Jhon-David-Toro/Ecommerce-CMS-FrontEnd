export interface TabsProps {
  tabs: readonly string[];
  initialTab: string;
  onTabChange: (tab: string) => void;
}
