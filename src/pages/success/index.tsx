import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, SuccessContainer } from "../../styles/pages/success";

interface SuccessPageProps {
  customerName: string;
  product: {
    imageUrl: "string";
  };
}

export default function SuccessPage({
  customerName,
  product,
}: SuccessPageProps) {
  return (
    <>
      <Head>
        <title>Success | 🎉</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Purchase had been succeed!</h1>

        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt={customerName}
            width={120}
            height={110}
          />
        </ImageContainer>
        <p>
          Uhuul! <strong>{customerName}</strong>, your purchase is already on
          way to your home!
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
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        imageUrl: product.images[0],
      },
    },
  };
};
