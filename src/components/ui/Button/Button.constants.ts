import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const BUTTON_ICONS = {
  "chevron-left": ArrowLeftIcon,
  "chevron-right": ArrowRightIcon,
} as const;

export const ICON_POSITIONS = {
  left: "left",
  right: "right",
} as const;

export const DEFAULT_TYPE_ATTRIBUTE = "submit";
