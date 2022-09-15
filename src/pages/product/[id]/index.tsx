import axios from "axios";
import Image from "next/future/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import React, { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../../styles/pages/product";

interface ProductByIdPageProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function ProductByIdPage({ product }: ProductByIdPageProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      console.error(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Product | {product.name}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={520}
            height={520}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>$ {product.price}</span>
          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            type="button"
            onClick={handleBuyProduct}
          >
            Buy now!
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "prod_MQXjU0YUdLnXOv",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const { id } = params;

  const productFromStripe = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = productFromStripe.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: productFromStripe.id,
        name: productFromStripe.name,
        imageUrl: productFromStripe.images[0],
        price: price.unit_amount / 100,
        description: productFromStripe.description,
        defaultPriceId: price.id,
      },
      revalidate: 60 * 60 * 1,
    },
  };
};
