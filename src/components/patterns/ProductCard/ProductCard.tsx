'use client';

import { FC, useState } from 'react';
import type { Product } from '@/lib/catalog/product.types';
import Image from 'next/image';
import Rating from '@/components/ui/Rating/Rating';
import ProductPrice from '@/components/patterns/ProductPrice/ProductPrice';
import styles from './ProductCard.module.scss';
import Link from 'next/link';
import Skeleton from '@/components/ui/Skeleton/Skeleton';

const ProductCard: FC<Product> = ({
  id,
  name,
  price,
  discountPrice,
  rating,
  image,
  discount,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className={styles.product}>
      {!imageLoaded && <Skeleton />}

      <Link
        href={`/product-details/${id}`}
        className={`${styles.product__link} ${
          !imageLoaded ? styles.product__loading : ''
        }`}
      >
        <Image
          src={image}
          alt={name}
          width={300}
          height={298}
          className={styles.product__image}
          onLoad={() => setImageLoaded(true)}
        />

        <section className={styles.product__info}>
          <h3 className={styles.product__name}>{name}</h3>
          <Rating rating={rating} size="medium" />
          <ProductPrice
            price={price}
            discountPrice={discountPrice!}
            discount={discount}
          />
        </section>
      </Link>
    </article>
  );
};

export default ProductCard;
