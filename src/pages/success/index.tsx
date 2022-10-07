import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from "../../styles/pages/success";

interface SuccessPageProps {
  customerName: string;
  count: number;
  products: {
    imageUrl: "string";
  }[];
}

export default function SuccessPage({
  customerName,
  products,
  count,
}: SuccessPageProps) {
  return (
    <>
      <Head>
        <title>Success | 🎉</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Purchase had been succeed!</h1>
        <ImagesContainer>
          {products.map((product) => {
            return (
              <ImageContainer key={product.imageUrl}>
                <Image
                  src={product.imageUrl}
                  alt={customerName}
                  width={120}
                  height={110}
                />
              </ImageContainer>
            );
          })}
        </ImagesContainer>

        <p>
          Uhuul! <strong>{customerName}</strong>, your purchase with {count}{" "}
          {count === 1 ? "Item " : "Items "}
          is already on way to your home!
        </p>

        <Link href="/">
          <a>Go back to home!</a>
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;

  const products = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return {
      imageUrl: product.images[0],
    };
  });

  const count = products.length;

  return {
    props: {
      count,
      customerName,
      products,
    },
  };
};
