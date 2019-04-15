import React from 'react'
import styles from '../note/completeList.css'
import { Row, Col, Button } from 'antd'
import moment from 'moment'

class completeList extends React.Component {

  componentDidMount () {
    this.renderList()
  }

  renderList = () => {
    let completeList = localStorage.getItem('completeList') 
    let listArray = []
    if (completeList) {
      //localStorage存在数据
      listArray = JSON.parse(localStorage.getItem('completeList'))
    }
    const listItem = listArray.map((list, key) => 
      <li key={key} title={`开始日期： ${moment().format('YYYY-MM-DD',list['range-picker'][0])} ~ 结束日期：${moment().format('YYYY-MM-DD',list['range-picker'][1])} `}>
        <Row>
          <Col span={4}> <span> {list.title} </span> </Col>
          <Col span={12}> <span> 开始日期： { moment().format('YYYY-MM-DD',list['range-picker'][0]) } ~ 结束日期： { moment().format('YYYY-MM-DD',list['range-picker'][1]) } </span> </Col>
          <Col span={4}> <span className={styles.completeCircle} ></span> </Col>
          <Col span={4}> <Button disabled onClick={ () => this.operateList(key) } className={styles.operateButton} type="primary" size="small"> 操作 </Button> </Col>
        </Row>
      </li>
    )
    return (
      <ul className={styles.completeList}>
        { listItem }
      </ul>
    )
  }
    
  render () {
    return (
      <div className={styles.completeBox}>
        { this.renderList() }
      </div>
    )
  }
}

export default completeList