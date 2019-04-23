import { queryNoteList } from '../../../../mock/server'

export default {
  name: 'note',
  state: {
    noteList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryNoteList, payload)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.noteList) ? response.noteList : [],
      })
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryNoteList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    }
  },

  reducers: {
    demo (state, action) {
      console.log('--- demo ---')
      console.log(state.noteList)
      console.log(action)
      console.log('--- demo ---')
    },
    queryList (state, action) { // noteList import data failed don't konw cause
    console.log(action.payload)
      return {
        ...state,
        noteList: action.payload
      }
    }
  },
}