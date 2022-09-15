import Image from "next/future/image";
import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import { GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import Link from "next/link";
import Head from "next/head";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
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
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={520} alt="" />
                <footer>
                  <strong>{product.name}</strong>
                  <span>$ {product.price.toString()}</span>
                </footer>
              </Product>
            </Link>
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
    };
  });
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
