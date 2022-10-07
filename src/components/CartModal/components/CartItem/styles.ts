import { styled } from "../../../../styles";

export const CartItemContainer = styled('li', {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',

  '&:not(:last-child)': {
    marginBottom: '1.6rem',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',

    button: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      color: '$green300',
      alignSelf: 'flex-start',

      '&:hover': {
        color: '$green500',
      }
    }
  }
})