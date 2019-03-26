import React from 'react'
import styles from './line.css'
import { Chart, Tooltip, Axis, Legend, Line, Point } from 'viser-react'
import { Button } from 'antd'
import axios from 'axios'

class Lines extends React.Component {
  
  state = {
    sourceData: []
  }
  
  componentDidMount () {
    this.queryAnalysisData()
  }
  
  queryAnalysisData = () => {
    axios('/api/dataAnalysis/dataAnalysis', {
      method: 'GET'
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          sourceData: res.data.list
        })
      }
    })
  }  

  render () {
    const DataSet = require('@antv/data-set')

    const dv = new DataSet.View().source(this.state.sourceData)
    dv.transform({
      type: 'fold',
      fields: ['WUHAN', 'YICHANG', 'NANJING'],
      key: 'city',
      value: 'temperature',
    });
    const data = dv.rows;
    
    const scale = [{
      dataKey: 'date',
      min: 0,
      max: 400,
    }]  
    return (
      <div className={styles.lineBox}>
        <h1> 月度销量分析 </h1>
        <Chart forceFit height={400} data={data} scale={scale} renderer='svg'>
          <Tooltip />
          <Axis />
          <Legend />
          <Line position="date*temperature" color="city" />
          <Point position="date*temperature" color="city" size={4} style={{ stroke: '#fff', lineWidth: 1 }} shape="circle"/>
        </Chart>
        <p className={styles.refreshBox}> <Button type="primary" onClick={ () => { this.queryAnalysisData() } }> Refresh Data </Button> </p>
      </div>
    )
  }
}

export default Lines