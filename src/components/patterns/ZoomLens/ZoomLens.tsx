import { FC } from 'react';
import { ZoomLensProps } from './ZoomLens.types';
import styles from './ZoomLens.module.scss';

export const ZoomLens: FC<ZoomLensProps> = ({ lensPosition }) => {
  return (
    <div
      className={styles.zoomLens}
      role='presentation'
      style={{
        left: `${lensPosition.x}px`,
        top: `${lensPosition.y}px`,
      }}
    />
  );
};
