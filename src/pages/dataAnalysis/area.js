import React from 'react'
import styles from './area.css'
import { Axis, Area, Chart, Line, Tooltip } from 'viser-react'
import { Button, Spin } from 'antd'
import axios from 'axios'

class Areas extends React.Component {

    state = {
      areData: [],
      loading: true
    }

    componentDidMount () {
      this.queryAreaData()
    }

    queryAreaData = () => {
      this.setState({
        loading: true
      })
      axios('/api/dataAnalysis/areaData', {
        method: 'GET'
      }).then((res) => {
        if (res.status === 200) {
          this.setState({
            areData: res.data.list,
            loading: false
          })
        }
      })
    }

    render () {
    const DataSet = require('@antv/data-set')
    const scale = [
      {
        dataKey: 'value',
        alias: 'The Share Price in Dollars',
        formatter: val => '$' + val,
      },
      {
        dataKey: 'year',
        range: [0, 1],
      },
    ]
    const data = this.state.areData
    const dv = new DataSet.View().source(data)
    dv.transform({
      type: 'fold',
      fields: ['Nokia', 'Apple'],
      key: 'type',
      value: 'value',
    })
    return (
      <div className={styles.areaBox}>
        <Spin spinning={this.state.loading}>
          <h1> 往年销量分析 </h1>
          <Chart forceFit={true} height={400} data={dv} scale={scale}>
            <Axis />
            <Tooltip crosshairs={true} />
            <Area position="year*value" color="type" shape="smooth" />
            <Line position="year*value" color="type" size={2} shape="smooth" />
          </Chart>
          <p className={styles.refreshBox}> <Button type="primary" onClick={ () => { this.queryAreaData() } }> Refresh Data </Button> </p>
        </Spin>
      </div>
    )
  }
}

export default Areas