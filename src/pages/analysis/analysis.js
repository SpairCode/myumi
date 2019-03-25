import React from 'react'
import styles from './analysis.css'
import { Row, Col, Icon, Table } from 'antd'
// import { queryBrowseData } from '../../../mock/api'
import axios from 'axios'

class Analysis extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      listArray: []
    }
  }

  componentDidMount () {
    this.queryListData()
  }

  queryListData = () => {
    axios('/api/analysis/browse', {
      method: 'GET'
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          list: res.data.list,
          listArray: res.data.listArray
        })
      }
    })
  }
  // Crad Data Render
  listCard = () => {
    const list = this.state.list
    const nameList = this.state.listArray
    console.log(nameList)
    const listItem = list.map((list, key) =>
      <Col className={[key === 0||3 ? `${styles.orange}` : '', key === 1 ? `${styles.purple}` : '', key === 2 ? `${styles.blue}` : '']} span={4} title={`${nameList[key]} : ${list.number}`}>
        <div className={styles.listCard}>
          <div> { nameList[key] } </div>
          <div> { list.number } </div>
        </div>
      </Col>
    )
    return (
      <Row type="flex" justify="space-between">
        { listItem }
      </Row>
    )
  }

  render () {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href='www.jd.com'>{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }]
    const data = [{
      key: '7',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    }
    return (
      <div className={styles.analysisBox}>
        {/* analysis data show*/}
        <div className={styles.cardList}>
          { this.listCard() }
        </div>
        {/* table data show*/}
        <p className={styles.tips}> <Icon type="tags" />  人员列表 </p>
        <div className={styles.tableBox}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
      </div>
    )
  }
}

export default Analysis