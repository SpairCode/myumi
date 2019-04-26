import React from 'react'
import { message, Spin, Input } from 'antd'
import styles from '../weather/weather.css'
import axios from 'axios'

class weatherService extends React.Component {

  state = {
    loading: true,
    search: false,
    cityList: [], // amap api return city name
    inputCity: {
      casts: []
    } // user input search city name
  }  

  componentDidMount () {
    // Amap weather api first time search appear to a error
    this.queryData()
  }

  queryData = () => {
    // Amap js api  
    let url = 'https://webapi.amap.com/maps?v=1.4.13&key=47d2d84ac020f60988ef016b93fef0ae&callback=onLoad'
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.body.appendChild(jsapi) 
    window.onLoad = function () {
      let AMap = window.AMap
      var map = new AMap.Map('adcode', { resizeEnable: true })
      localStorage.setItem('adcode', map.getAdcode())
    }
    this.queryWeather()
  }

  queryWeather = () => {
    // Amap web service api
    let baseUrl = 'https://restapi.amap.com/v3/weather/weatherInfo?key=748a63397b6df98234e0e873a73e7619&city=' + localStorage.getItem('adcode') + '&extensions=base&output=JSON'  
    axios(baseUrl, {
      method: 'GET'
    }).then((res) => {
      if (res.status === 200) {
        message.success('加载成功!')
        if (res.data.lives.length !== 0) {
          this.setState({
            cityList: res.data.lives[0],
            loading: false
          })
        } else {
          message.error('暂无该城市数据!')
        }
      } else {
        message.error('请您按F5刷新页面!')
      }
    })
  }

  queryUserWeather = (data) => {
    if (data.length === 0) {
      message.error('城市名称不能为空!')
    } else {
      let baseUrl = 'https://restapi.amap.com/v3/weather/weatherInfo?key=748a63397b6df98234e0e873a73e7619&city=' + data + '&extensions=all&output=JSON'
      axios(baseUrl, {
        method: 'GET'
      }).then((res) => {
        if (res.data.forecasts[0].casts.length === 0) {
          this.setState({
            inputCity: res.data.forecasts[0],
            search: false
          })
          message.error('暂无该城市天气数据')
        } else {
          this.setState({
            inputCity: res.data.forecasts[0],
            search: true
          })
        }
      })
    }
  }

  render () {
    const Search = Input.Search  
    return (
      <div className={styles.weatherBox}>
        <Spin spinning={this.state.loading}>
          <p className={styles.tips}> 您当前所在的位置 <span className="error">  {this.state.cityList.province} - {this.state.cityList.city} </span>, 天气： <span className="error"> {this.state.cityList.weather} </span> , 当前温度： <span className="danger"> {this.state.cityList.temperature} C </span>, 查询时间： <span className="warn"> { this.state.cityList.reporttime } </span> </p>
          {/* <div id="adcode"></div> */}
          <div className={styles.searchBox}>
            <Search
              placeholder="请输入城市名称,查询当地天气情况"
              enterButton="Search"
              size="large"
              onSearch={value => this.queryUserWeather(value)}
            />
          </div>
          <div className={ this.state.search === true ? `${styles.resultBox} show` : `${styles.resultBox} hide` }>
            {/* 查询城市 */}
            <h1> { this.state.inputCity.city }最近天气 </h1>
            <ul className={styles.cityLists}>
            { this.state.inputCity.casts.map((res, index) => 
              <li> 时间：{ res.date }    天气：{ res.dayweather }     白天温度：<span> { res.daypower } ~ { res.daytemp } </span>    夜间温度：<span> { res.nightpower } ~ { res.nighttemp } </span> </li>
            ) }
            </ul>
          </div>
        </Spin>
      </div>
    )
  }
}

export default weatherService