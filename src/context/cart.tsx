import axios from "axios";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import CartModalComponent from "../components/CartModal";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceId: string;
  sku: string;
  description?: string;
}

interface CartContextData {
  cartList: Product[];
  isCartModalOpen: boolean;
  cartListCounter: number;
  cartListTotal: number;
  setIsCartModalOpen: Dispatch<SetStateAction<boolean>>;
  addItemToCart: (item: Product) => void;
  removeItemFromCart: (item: Product) => void;
  submitCart: () => void;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }) {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [cartList, setCartList] = useState<Product[]>(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("ig.shop@cartList")
    ) {
      return JSON.parse(window.localStorage.getItem("ig.shop@cartList"));
    }
    return [] as Product[];
  });

  const addItemToCart = (item: Product) => {
    if (cartList.find((cartItem) => cartItem.id === item.id)) return;
    setCartList((oldState) => [...oldState, item]);
    localStorage.setItem("ig.shop@cartList", JSON.stringify(cartList));
  };

  const removeItemFromCart = (item: Product) => {
    setCartList((oldState) => oldState.filter((product) => product !== item));
    localStorage.setItem("ig.shop@cartList", JSON.stringify(cartList));
  };

  const getAllPricesId = (items: Product[]) => {
    return items.map((item) => item.priceId);
  };

  const submitCart = async () => {
    try {
      const response = await axios.post("/api/checkout", {
        priceIds: getAllPricesId(cartList),
      });

      setCartList([]);
      localStorage.removeItem("ig.shop@cartList");

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  };

  const cartListCounter = cartList.length;

  const prices = cartList.map((item) => item.price);

  const cartListTotal = prices.reduce((acc, item) => {
    return acc + item;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartList,
        isCartModalOpen,
        cartListCounter,
        cartListTotal,
        addItemToCart,
        removeItemFromCart,
        submitCart,
        setIsCartModalOpen,
      }}
    >
      {isCartModalOpen && <CartModalComponent />}
      {children}
    </CartContext.Provider>
  );
}
