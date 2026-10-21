import { HERO_IMAGE_SIZES } from "../Hero.constants";
import type { HeroImagesProps } from "../Hero.types";
import { HeroImage } from "./HeroImage";
import styles from "../Hero.module.scss";

/**
 * Hero/Images: the desktop and the mobile pictures of the hero; the stylesheet shows the one that fits the screen.
 *
 * @param props Component props.
 * @param props.desktopImage Address of the desktop picture.
 * @param props.mobileImage Address of the mobile picture.
 * @returns The two pictures.
 */
export const HeroImages = ({ desktopImage, mobileImage }: HeroImagesProps) => (
  <>
    <HeroImage src={desktopImage} {...HERO_IMAGE_SIZES.desktop} className={styles.hero__image} />
    <HeroImage src={mobileImage} {...HERO_IMAGE_SIZES.mobile} className={styles.hero__image_mobile} />
  </>
);
