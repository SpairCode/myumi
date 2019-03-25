import Mock from 'mockjs'

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': (req, res) => {
    res.send(Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|4': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'number|100-1000': 1
    }]
    }))  
  }
}