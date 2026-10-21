export interface FooterLink {
  label: string;
  href: string;
  src?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface PaymentMethod {
  name: string;
  src: string;
  alt: string;
}
