export default {
  namespace: 'menuArray',
  state: {
    menuArray: ['1']
  },
  reducers: {
    save (state, action) {
      return {
        ...state,
        ...action
      }
    }
  }
}