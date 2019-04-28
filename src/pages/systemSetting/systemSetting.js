import React from 'react'
import styles from './systemSetting.css'
import { Spin, List, Row, Col, Button } from 'antd'
import { connect } from 'dva'

@connect(({ systemSetting }) => ({ systemSetting }))

class SystemSetting extends React.Component {

  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: 'systemSetting/fetch'
    })
  }

  componentWillUnmount () {
    const { dispatch } = this.props
    dispatch({
      type: 'systemSetting/changeLoading'
    })
  }

  Items = () => {
    const listData = this.props.systemSetting.list
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
        <Spin spinning={this.props.systemSetting.loading}>
          { this.Items() } 
        </Spin>
      </div>
    )
  }
}

export default SystemSetting