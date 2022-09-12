import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },

  body: {
    '--webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100',
    overflow: "hidden",
  },

  'body, input, button': {
    font: '16px Roboto, sans-serif',
    fontWeight: 400,
  },
})