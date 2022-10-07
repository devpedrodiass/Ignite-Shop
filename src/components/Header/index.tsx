import React, { useContext } from "react";
import logoImg from "../../assets/logo.svg";
import Image from "next/future/image";
import { CartListCounter, HeaderContainer, OpenCartButton } from "./styles";
import { Handbag } from "phosphor-react";
import { CartContext } from "../../context/cart";

export default function HeaderComponent() {
  const { cartListCounter, setIsCartModalOpen } = useContext(CartContext);

  function handleOpenCartModal() {
    setIsCartModalOpen(true);
  }
  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      <OpenCartButton type="button" onClick={handleOpenCartModal}>
        <Handbag size={24}></Handbag>
        <CartListCounter>{cartListCounter}</CartListCounter>
      </OpenCartButton>
    </HeaderContainer>
  );
}
