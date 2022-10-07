import { AppProps } from "next/app";
import HeaderComponent from "../components/Header";
import { CartProvider } from "../context/cart";
import { globalStyles } from "../styles/global";
import { CartProvider as StripeCartProvider } from "use-shopping-cart";

globalStyles();

import { Container } from "../styles/pages/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <StripeCartProvider
        cartMode="checkout-session"
        stripe={process.env.STRIPE_PUBLIC_KEY}
        currency="USD"
        loading={<p aria-live="polite">Loading redux-persist...</p>}
      >
        <CartProvider>
          <HeaderComponent></HeaderComponent>
          <Component {...pageProps} />
        </CartProvider>
      </StripeCartProvider>
    </Container>
  );
}
