import { X } from "phosphor-react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Stripe from "stripe";
import { CartContext } from "../../context/cart";
import CartItemComponent from "./components/CartItem";
import {
  CartContainer,
  List,
  CloseModalButton,
  ValuesIndicators,
  ConfirmButton,
  EmptyList,
} from "./styles";

export default function CartModalComponent() {
  const {
    cartList,
    cartListTotal,
    setIsCartModalOpen,
    submitCart,
    cartListCounter,
  } = useContext(CartContext);

  function handleCloseModal() {
    setIsCartModalOpen(false);
  }

  const hasItemsOnCart = cartList.length > 0;

  const renderList = () => {
    if (!hasItemsOnCart)
      return <EmptyList>😢 No items in your cart!</EmptyList>;

    return cartList.map((item) => {
      return <CartItemComponent key={item.id} item={item}></CartItemComponent>;
    });
  };

  return (
    <CartContainer>
      <CloseModalButton type="button" onClick={handleCloseModal}>
        <X size={24}></X>
      </CloseModalButton>
      <List>
        <h1>Cart List</h1>
        <ul>{renderList()}</ul>
      </List>
      <ValuesIndicators>
        <p>
          Quantity
          <span>
            {cartListCounter} {cartListCounter === 1 ? "Item" : "Items"}
          </span>
        </p>
        <p>
          Total Value<span>$ {cartListTotal}</span>
        </p>
      </ValuesIndicators>
      <ConfirmButton type="button" onClick={submitCart}>
        Confirm Purchase!
      </ConfirmButton>
    </CartContainer>
  );
}
