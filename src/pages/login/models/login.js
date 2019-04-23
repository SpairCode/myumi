export default {
  namespace: 'login',
  state: {
    userName: ''
  },
  reducers: {
    saveUserName (state, action) {
      return {
        userName: action.payload.userName
      }
    },
    // queryUserName (state, action) {
    //   return state.userName
    // } 
  },
}