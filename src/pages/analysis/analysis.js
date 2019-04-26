import React from 'react'
import styles from './analysis.css'
import { Row, Col, Icon, Table, Button, Divider, Spin } from 'antd'
import axios from 'axios'

class Analysis extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      listArray: [],
      tableArray: [],
      loading: true
    }
  }

  componentDidMount () {
    this.queryListData()
    this.queryTableData()
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

  queryTableData = () => {
    axios('/api/analysis/table', {
      method: 'GET'
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          tableArray: res.data.list,
          loading: false
        })
      } 
    })
  }

  editMsg = (val) => {
    console.log(val)
  }

  // Crad Data Render
  listCard = () => {
    const list = this.state.list
    const nameList = this.state.listArray
    const listItem = list.map((list, key) =>
      <Col key={ key } className={[key === 0||3 ? `${styles.orange}` : `none`, key === 1 ? `${styles.purple}` : `none`, key === 2 ? `${styles.blue}` : `none`]} span={4}>
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
      render: text => <span> { text } </span>
    }, {
      title: 'Age',
      dataIndex: 'age',
      render: text => <span className='danger'> { text } </span>
    }, {
      title: 'Address',
      dataIndex: 'address',
      render: text => <span> { text } </span>
    }, {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={ () => this.editMsg(record) } > Edit </Button>
          <Divider type="vertical" />
          <Button type="danger"> Delete </Button>
        </div>
      )
    }]
    const data = this.state.tableArray
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
        <Spin spinning={this.state.loading}>
          {/* analysis data show*/}
          <div className={styles.cardList}>
            { this.listCard() }
          </div>
          {/* table data show*/}
          <p className={styles.tips}> <Icon type="tags" />  人员列表 </p>
          <div className={styles.tableBox}>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        </Spin>
      </div>
    )
  }
}

export default Analysis