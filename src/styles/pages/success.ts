import { styled } from "..";

export const SuccessContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: "block",
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',

    textDecoration: 'none',

    '&:hover': {
      color: '$green300'
    }
  }
})

export const ImagesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 130,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  borderRadius: 999999999,
  padding: '0.25rem',

  marginTop: '4rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',


  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',

  '&:not(:first-child)': {
    marginLeft: '-4rem'
  },

  img: {
    objectFit: 'cover',
  }
})