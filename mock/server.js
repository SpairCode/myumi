import Mock from 'mockjs'
import { delay } from 'roadhog-api-doc' // 模拟网络延迟
import request from '../mock/request'

// list port data
const browseData = (req, res) => {
  res.send(Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|4': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'number|100-1000': 1
    }],
    'listArray': ['参加人数', '浏览人数', '预约人数', '实时人数']
  }))
}

// tableList port data
const tableData = (req, res) => {
  res.send(Mock.mock({
    'list|100': [{
       'key|+1': 1,
       'name':  '@cname',
       'age': '@natural(10, 40)',
       'address': '@county(true)'
    }]
  }))
}

// charts port data
const dataAnalysis = (req, res) => {
  res.send(Mock.mock({
    'list|12': [{
      'date|+1': '@date(MM-dd)',
      'WUHAN': '@natural(100, 400)',
      'YICHANG': '@natural(100, 400)',
      'NANJING': '@natural(100, 400)',
    }]
  }))
}


// charts port data
const yearAnalysis = (req, res) => {
  res.send(Mock.mock({
    'list|10': [{
      'year|+1': 2010,
      'value': '@natural(100, 400)'
    }]
  }))
}


// area charts port data
const areaData = (req, res) => {
  res.send(Mock.mock({
    'list|30': [{
      'year|+1': 1990,
      'Nokia': '@natural(10, 400)',
      'Apple': '@natural(10, 500)'
    }]
  }))
}

// System setting port data
const systemSetting = (req, res) => {
  res.send(
    {
      data: [{
        title: '用户设置',
        default: 'Fan'
      }, {
        title: '密码设置',
        default: '666666'
      }, {
        title: '手机设置',
        default: '18307130014'
      }, {
        title: '邮箱设置',
        default: 'spairfan@126.com'
      }]
    }
  )
}

// note list port data
const noteForm = (req, res) => {
  res.send(Mock.mock({
    'noteList|16': [{
      'title': '@last',
      'range-picker': ['@now', '@now(second)'],
      'select|1-3': 3,
      'textarea': '@cparagraph',
      'id|+1': 0
    }]
  }))
}

const proxy = {
  'GET /api/analysis/browse' : browseData,
  'GET /api/analysis/table' : tableData,
  'GET /api/dataAnalysis/dataAnalysis': dataAnalysis,
  'GET /api/dataAnalysis/yearAnalysis': yearAnalysis,
  'GET /api/dataAnalysis/areaData': areaData,
  'GET /api/systemSetting/systemSetting': systemSetting,
  'GET /api/noteForm/noteForm':noteForm
}

export default delay(proxy, 1000)

export async function queryNoteList() {
  // return request('http://192.168.138.1:8080/api/noteForm/noteForm')
  return request('http://192.168.10.229:8080/api/noteForm/noteForm')
}