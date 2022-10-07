import { keyframes, styled } from "../../styles";

const slideAside = keyframes({
  'from': { transform: 'translateX(50%)', opacity: 0 },
  'to': { transform: 'translateX(0)', opacity: 1 },
});

export const CartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray800',
  minWidth: '30vw',
  height: '100vh',
  padding: '3rem',

  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 10,
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',


  animation: `${slideAside} 0.3s ease-in-out forwards`,
})

export const CloseModalButton = styled('button', {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  color: '$gray100',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

})

export const List = styled('div', {
  marginTop: '1.5rem',

  h1: {
    marginBottom: '1.5rem',
    color: '$gray500',
    fontSize: '1.25rem',
  }
})

export const EmptyList = styled('div', {
  width: '100%',
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const ValuesIndicators = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4375rem',
  width: '100%',

  p: {
    '&:first-child': {
      display: 'flex',
      justifyContent: 'space-between',
      lineHeight: 1.5,

      span: {
        fontSize: '1.125rem',
      },
    },

    '&:last-child': {
      display: 'flex',
      fontSize: '1.125rem',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      lineHeight: 1.5,

      span: {
        fontSize: '1.5rem',
      }
    }
  }
})

export const ConfirmButton = styled('button', {
  marginTop: '3.4375rem',
  border: 'none',

  background: '$green500',
  color: '$white',

  padding: '1.25rem 2rem',

  borderRadius: 8,

  cursor: 'pointer',

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    background: '$green300',
  }
})