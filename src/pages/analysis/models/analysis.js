import { queryTableData, queryBrowseData } from '../../../../mock/server'

export default {
  namespace: 'analysis',
  state: {
    tableArray: [],
    list: [],
    listArray: [],
    loading: true
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTableData, payload)
      yield put({
        type: 'save',
        payload: Array.isArray(response.list) ? response.list : []
      })
    },
    *fetchBrowseData ({ payload }, { call, put }) {
      const response = yield call(queryBrowseData, payload)
      yield put({
        type: 'saveBrowseData',
        payload: Array.isArray(response) ? [] : response
      })
    }
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        tableArray: action.payload,
        loading: false
      }
    },
    saveBrowseData (state, action) {
      return {
        ...state,
        list: action.payload.list,
        listArray: action.payload.listArray
      }
    },
    changeLoading (state, action) {
      return {
        ...state,
        loading: true
      }
    }
  }
}