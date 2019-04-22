export default {
  namespace: 'count',
  state: {
    count: 666
  },
  reducers: {
    add (state, payload) {
      return {
        count: state.count + 1
      }
    },
    minus (state, payload) { 
      return {
        count: state.count -1
      }
    }
  },
}