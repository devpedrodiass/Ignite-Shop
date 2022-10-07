import Image from "next/future/image";
import { HomeContainer, Product as StyledProduct } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import { GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import Link from "next/link";
import Head from "next/head";
import { Bag } from "phosphor-react";
import { useContext } from "react";
import { CartContext, Product } from "../context/cart";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const { addItemToCart } = useContext(CartContext);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const hasProducts = products && products.length > 0;

  return (
    <>
      <Head>
        <title>Home | Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {hasProducts &&
          products.map((product) => (
            <StyledProduct key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={520} alt="" />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>$ {product.price.toString()}</span>
                </div>

                <button type="button" onClick={() => addItemToCart(product)}>
                  <Bag size={24}></Bag>
                </button>
              </footer>
            </StyledProduct>
          ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      priceId: price.id,
    };
  });
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
