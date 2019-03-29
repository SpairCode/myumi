import React from 'react'
import styles from './meetingMap.css'
import axios from 'axios'
import { Spin } from 'antd'

class meetingMap extends React.Component {

  state = {
    loading: true
  }

  componentDidMount () {
    this.drawLoc()
  }  

  drawLoc = () => {
    let data = []
    axios('https://www.easy-mock.com/mock/5ad6c269baad39136d1d28c2/example/maps', {
      method: 'GET'
    }).then((res) => {
      for (var index in res.data.data.address) {
        data.push([res.data.data.address[index].long, res.data.data.address[index].lati])
      }
      this.renderMap(data)
    })
  }  

  renderMap = (data) => {
    let url = 'https://webapi.amap.com/maps?v=1.4.13&key=47d2d84ac020f60988ef016b93fef0ae&callback=onLoad'
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.body.appendChild(jsapi)  
    window.onLoad  = function () {
      let AMap = window.AMap
      let map = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom:11, //初始化地图层级
        dragEnable: false, //禁止拖动地图
        // position: new AMap.LngLat(data),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        center: [116.397428, 39.90923] //初始化地图中心点
      })  
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      })  
      var polygon = new AMap.Polygon({
        path: data,
        strokeColor: "#1890FF", 
        strokeWeight: 2,
        strokeOpacity: 0.2,
        fillOpacity: 0.8,
        fillColor: '#FF0000',
        zIndex: 50,
      })  
      // 将点，线，面添加到地图
      map.add([polygon])
      map.add(marker)
      //使用CSS默认样式定义地图上的鼠标样式
      map.setDefaultCursor("move")
    }
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 300)
  }

  render () {
    return (
      <div className={styles.mapBox}>
        <Spin spinning={this.state.loading}>
          <div style={{ width: '100%', minHeight: '70vh' }} id="container"></div>
        </Spin>
      </div>
    )
  }
}

export default meetingMap