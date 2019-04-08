import React from 'react'
import styles from './systemSetting.css'
import { Spin, List, Row, Col, Button } from 'antd'
import axios from 'axios'

class SystemSetting extends React.Component {

  state = {
    loading: true,
    list: []
  }

  componentDidMount () {
    this.queryListData()
  }

  queryListData = () => { 
    axios('/api/systemSetting/systemSetting', {
      method: 'GET'
    }).then((res) => {
      this.setState({
        list: res.data.data,
        loading: false
      })
    })
  }

  Items = () => {
    const listData = this.state.list
    const Lists = listData.map((lists, key) =>
     <List.Item key={key}>
      <Row style={{ width: '100%', padding: '0px 15px' }}>
        <Col span={16}>
          <div style={{ textAlign: 'left', lineHeight: '25px' }}> { lists.title } </div>
          <div style={{ textAlign: 'left', color: '#bfbfbf', lineHeight: '25px' }} > { lists.default } </div>
        </Col>
        <Col style={{ textAlign: 'right' }} span={8}>
          <Button type="primary"> 编辑 </Button>
        </Col>
      </Row>
     </List.Item>    
    )
    return (
      <List style={{ minHeight: '70vh' }}>
        { Lists }
      </List>
    )
  }

  render () {
    return (
      <div className={styles.systemBox}>
        <Spin spinning={this.state.loading}>
          { this.Items() } 
        </Spin>
      </div>
    )
  }
}

export default SystemSetting