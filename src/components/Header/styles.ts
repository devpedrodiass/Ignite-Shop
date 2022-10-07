import { styled } from "../../styles";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const OpenCartButton = styled('button', {
  background: '$gray800',
  border: 'none',

  padding: '0.75rem',
  borderRadius: 8,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  color: '$gray100',

  cursor: 'pointer',

  position: 'relative',
})

export const CartListCounter = styled('span', {
  position: 'absolute',

  top: -8,
  right: -8,

  background: '$green500',
  borderRadius: '50%',
  border: '3px solid $gray900',
  padding: '0.25rem',

  width: '1.7rem',
  height: '1.7rem',

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: '0.75rem',
  fontWeight: "bold",
})