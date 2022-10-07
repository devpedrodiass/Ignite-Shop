import Image from "next/future/image";
import React, { useContext } from "react";
import Stripe from "stripe";
import { CartContext, Product } from "../../../../context/cart";
import { CartItemContainer } from "./styles";

interface CartItemComponentProps {
  item: Product;
}

export default function CartItemComponent({ item }: CartItemComponentProps) {
  const { removeItemFromCart } = useContext(CartContext);
  return (
    <CartItemContainer>
      <Image src={item.imageUrl} alt={item.name} width={100} height={100} />
      <div>
        <strong>{item.name}</strong>
        <span>$ {item.price.toString()}</span>
        <button type="button" onClick={() => removeItemFromCart(item)}>
          Remove
        </button>
      </div>
    </CartItemContainer>
  );
}
