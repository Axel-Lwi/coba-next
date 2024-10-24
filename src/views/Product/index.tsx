import styles from "./Product.module.scss";
import {ProductType} from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";

const ProductView = ({products}: {products : ProductType[]}) => {
  return(
    <div className={styles.product}>
      <h1 className={styles.product__title}> Our Collection</h1>
      <div className={styles.product__content}>
        {products.length> 0 ? (
          <>
            {products.map((product : ProductType) => (
              <Link href={`/product/${product.id}`} key={product.id} className={styles.product__content__item}>
                <div className={styles.product__content__item__image}>
                  <Image width={250} height={250} className={styles.product__content__item__image} src={product.image} alt={product.name} />
                </div>
                <h4 className={styles.product__content__item__name}>
                  {product.name}
                </h4>
                <p className={styles.product__content__item__category}>
                  {product.category}
                </p>
                <p className={styles.product__content__item__price}>
                  {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </p>
              </Link>
            ))} 
          </>
        ) :(
          <div className={styles.product__content__skeleton}>
            <div className={styles.product__content__skeleton__image}/>
            <div className={styles.product__content__skeleton__name}/>
            <div className={styles.product__content__skeleton__category}/>
            <div className={styles.product__content__skeleton__price}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;