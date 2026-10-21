'use client'

import { FC, useState } from 'react';
import { ProductInfoProps } from './ProductInfo.types';
import Rating from '@/components/ui/Rating/Rating';
import Button from '@/components/ui/Button/Button';
import QuantityControl from '@/components/ui/QuantityControl/QuantityControl';
import ProductPrice from '@/components/patterns/ProductPrice/ProductPrice';
import ColorSelector from '@/components/ui/SelectColor/SelectColor';
import SizeSelector from '@/components/patterns/SizeSelector/SizeSelector';
import Divider from '@/components/ui/Divider/Divider';
import styles from './ProductInfo.module.scss';

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <article className={styles.product}>
      <h2 className={styles.product__title}>{product.name}</h2>
      <Rating rating={product.rating} size="extra-medium" />
      <ProductPrice price={product.price} discountPrice={product.discountPrice} discount={product.discount} />
      <p className={styles.product__description}>{product.description.overview}</p>

      <Divider/>
      <ColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      <Divider/>
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      <Divider/>
      <section className={styles.product__addToCart}>
        <QuantityControl
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <Button id="add-to-cart" type='primary' text='Add to Cart' size='extra-large' typeAttribute='button' />
      </section>
    </article>
  );
};

export default ProductInfo;