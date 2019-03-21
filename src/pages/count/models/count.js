export default {
  namespace: 'count',
  state: 666,
  reducers: {
    add  (count) { return count + 1 },
    minus(count) { return count - 1 }
  },
}