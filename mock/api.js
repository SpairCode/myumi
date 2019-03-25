
import request from 'request'

// Setting Port Number or Url
const baseUrl = 'http://192.168.10.233:8080'

export async function queryBrowseData() {
  return request(baseUrl + '/api/analysis/browse', (req, res) => {
    return res
  })
}