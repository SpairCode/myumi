import { queryNoteList } from '../../../../mock/server'

export default {
  name: 'note',
  state: {
    noteList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryNoteList, payload)
      console.log(response)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      })
    }
  },
  reducers: {
    completeWork(data, key) {
      key.payload.listData.splice(key.payload.key, 1)
      return key.payload.listData
    },
    queryList(state, action) {
      return {
        ...state,
        noteList: action.payload
      }
    }
  },
}