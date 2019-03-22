import React from 'react'
import styles from './analysis.css'
import { Row, Col, Icon, Table } from 'antd'

class Analysis extends React.Component {
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
    }, {
      key: '8',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '9',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '10',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    }, {
        key: '11',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    }, {
        key: '12',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    }, {
      key: '13',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    }, {
        key: '14',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    }, {
        key: '15',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    }, {
        key: '16',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    }, {
        key: '17',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
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
        <Row type="flex" justify="space-between">
          <Col className={styles.orange} span={4}>
            <div className={styles.listCard}>
              <div> 参加人数 </div>
              <div> 666 </div>
            </div>
          </Col>
          <Col className={styles.purple} span={4}>
            <div className={styles.listCard}>
              <div> 报名人数 </div>
              <div> 569 </div>
            </div>
          </Col>
          <Col className={styles.blue} span={4}>
            <div className={styles.listCard}>
              <div> 预约人数 </div>
              <div> 563 </div>
            </div>
          </Col>
          <Col className={styles.blue} span={4}>
            <div className={styles.listCard}>
              <div> 浏览人数 </div>
              <div> 789 </div>
            </div>
          </Col>
        </Row>
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