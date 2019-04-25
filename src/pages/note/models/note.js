import { queryNoteList } from '../../../../mock/server'

export default {
  name: 'note',
  state: {
    noteList: [], // 未完成列表
    overList: [], // 已完成列表
    loading: true
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryNoteList, payload)
      yield put({
        type: 'save',
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
    editCompleteList (state, action) { // base query id delete list no use data
      return {
        noteList: state.noteList.filter(list => list.id !== action.payload.id), // return noteList
        loading: false
      }
    },
    save (state, action) { // save queryData List
      return {
        noteList: action.payload,
        loading: false
      }
    },
    saveOverList (state, action) {
      return {
        overList: state.overList.concat(action.payload.list)
      }
    },
    queryOverList (state, action) {
     return {
       overList: state.overList
     }
    }
  },
}