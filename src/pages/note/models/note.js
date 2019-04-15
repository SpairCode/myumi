export default {
  name: 'note',
  state: [],
  reducers: {
    'test' (data, key) {
      debugger
      console.log(data)
      console.log(key)
    }
  },
}