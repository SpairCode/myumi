
export const dva = {
  config: {
    onError(e) {
      e.preventDefault()
    },
  },
  plugins: [
    require('dva-logger')(),
  ],
}