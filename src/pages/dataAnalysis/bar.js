import React from 'react'
import  styles from './bar.css'
import { Chart, Tooltip, Axis, Bar } from 'viser-react'
import { Button } from 'antd'
import axios from 'axios'

class Bars extends React.Component {

  state = {
    barData: []
  }

  componentDidMount () {
    this.queryBarData()
  }  

  queryBarData = () => {
    axios('/api/dataAnalysis/yearAnalysis', {
      method: 'GET'
    }).then((res) => {
      if (res.status === 200) {
        for (let index in res.data.list) {
          res.data.list[index].year = res.data.list[index].year + '年'
        }
        this.setState({
          barData: res.data.list
        })
      }
    })
  }

  render () {
    const scale = [{
      dataKey: 'value',
      min: 0,
      max: 400,
      tickInterval: 50, // 刻度标线差值
    }]  
    const data = this.state.barData
    return (
      <div className={styles.barBox}>
        {/* forceFit 自适应宽度 */}
        <h1> 年度销量分析 </h1>
        <Chart forceFit height={400} data={data} scale={scale} renderer='svg'>
          <Tooltip />
          <Axis />
          <Bar position="year*value" />
        </Chart>
        <p className={styles.refreshBox}> <Button type="primary" onClick={ () => { this.queryBarData() } }> Refresh Data </Button> </p>
      </div>
    )
  }
}

export default Bars