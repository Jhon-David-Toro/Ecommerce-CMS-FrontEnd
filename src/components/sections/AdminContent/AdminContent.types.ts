import type { SiteContent } from "@/lib/content/content.types";
import type { Errors, FieldProps } from "@/lib/shared/forms/forms.types";

export interface ContentFormValues {
  bannerEnabled: boolean;
  bannerText: string;
  bannerLinkText: string;
  bannerLinkHref: string;
  heroTitle: string;
  heroParagraph: string;
  heroCtaText: string;
  heroCtaHref: string;
  heroDesktopImage: string;
  heroMobileImage: string;
  stats: string;
  navbar: string;
  sidebar: string;
  footerTagline: string;
  footerColumns: string;
}

export interface ContentFormBodyProps {
  content: SiteContent;
}

export interface ContentFieldsProps {
  field: (name: keyof ContentFormValues & string) => FieldProps;
  errors: Errors;
}

export interface BannerFieldsProps extends ContentFieldsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
}
