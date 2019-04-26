export default {
  namespace: 'login',
  state: {
    userName: ''
  },
  reducers: {
    saveUserName (state, action) {
      return {
        ...state,
        userName: action.payload.userName
      }
    },
    queryUserName (state, action) {
      return {
        ...state,
        ...action.payload
      }
    } 
  },
}