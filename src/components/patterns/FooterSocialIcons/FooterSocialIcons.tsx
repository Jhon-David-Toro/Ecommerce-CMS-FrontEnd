import Image from "next/image";
import type { FC } from "react";

import { SOCIAL_ICON_SIZE } from "@/lib/site/footer.constants";

import type { FooterSocialIconsProps } from "./FooterSocialIcons.types";
import styles from "./FooterSocialIcons.module.scss";

/**
 * FooterSocialIcons: icon links to the store social networks.
 *
 * @param props Component props.
 * @param props.links Social network links with their icon.
 * @returns The social links.
 */
export const FooterSocialIcons: FC<FooterSocialIconsProps> = ({ links }) => (
  <div className={styles.social} role="navigation" aria-label="Social Media Links">
    {links.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.social__link}
        aria-label={`Visit our ${link.label} page`}
      >
        <Image src={link.src ?? ""} alt={`${link.label} icon`} {...SOCIAL_ICON_SIZE} />
      </a>
    ))}
  </div>
);
