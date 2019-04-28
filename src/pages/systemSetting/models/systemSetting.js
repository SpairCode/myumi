import { querySystemSetting } from '../../../../mock/server'

export default {
  namespace: 'systemSetting',
  state: {
    list: [],
    loading: true
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySystemSetting, payload)
      yield put({
        type: 'save',
        payload: Array.isArray(response.data) ? response.data : []
      })
    }
  },
  reducers: {
    save (state, action) {
      return {
        ...state,
        list: action.payload,
        loading: false
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