export default {
  namespace: 'login',
  state: {
    status: undefined
  },
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
}