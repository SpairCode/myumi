import Mock from 'mockjs'

const Random = Mock.Random

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

const yearAnalysis = (req, res) => {
  res.send(Mock.mock({
    'list|10': [{
      'year|+1': 2010,
      'value': '@natural(100, 400)'
    }]
  }))
}

const areaData = (req, res) => {
  res.send(Mock.mock({
    'list|30': [{
      'year|+1': 1990,
      'Nokia': '@natural(10, 400)',
      'Apple': '@natural(10, 500)'
    }]
  }))
}

export default {
  'GET /api/analysis/browse' : browseData,
  'GET /api/analysis/table' : tableData,
  'GET /api/dataAnalysis/dataAnalysis': dataAnalysis,
  'GET /api/dataAnalysis/yearAnalysis': yearAnalysis,
  'GET /api/dataAnalysis/areaData': areaData
}