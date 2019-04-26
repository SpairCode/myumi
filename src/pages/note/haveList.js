import React from 'react'
import moment from 'moment'
import { connect } from 'dva'
// import router from 'umi/router'
import { Button, Modal, Row, Col, Spin, Popconfirm, message } from 'antd'
import styles from '../note/haveList.css'
import EditNoteForm from '../note/editNoteForm'

// const confirm = Modal.confirm

@connect(({ note }) => ({ note }))

class HaveList extends React.Component {

  state = {
    visible: false, // 逾期修改弹窗
    editArray: [], // 逾期修改数组
  }

  componentDidMount () {
    // 1. list switcher no request data
    const { dispatch } = this.props
    dispatch({
      type: 'note/fetch'
    })
  }

  componentWillUnmount () {
    console.log('减少内存泄漏操作')
  }

  // confirm delete list array data
  confirm = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'note/deleteComplete',
      payload: {
        id: id
      }
    })
    message.success('删除成功')
  }
  
  cancel = (e) => {
    message.success('删除取消')
  }

  // close edit form
  closeForm = () => {
    this.setState({
      visible: false
    })
  }

  // overude list array data
  overRude = (data) => {
    this.setState({
      visible: true,
      editArray: data
    })
    // editNoteForm 未设置 initialValue
  }

  // 该条任务已经完成
  completeWork = (key, list) => { //introduction id
    const { dispatch } = this.props
    dispatch({
      type: 'note/editCompleteList',
      payload: {
        id: key
      }
    })
    //  the overList equal to undefined
    dispatch({
      type: 'note/saveOverList',
      payload: {
        list: list
      }
    })
  }

  renderList = () => {
    let listData = this.props.note.noteList
    let listArray = []
    if (listData) {
      for (var index in listData) {
        listArray.push(listData[index])
      }
    }
    const listItem = listArray.map((list, key) =>
      <li key={key} className={styles.list} title={`开始日期： ${moment().format('YYYY-MM-DD',list['range-picker'][0])} ~ 结束日期：${moment().format('YYYY-MM-DD',list['range-picker'][1])} `}>
        <Row>
          <Col span={4}> <span> {list.title} </span> </Col>
          <Col span={12}> <span> 开始日期： { moment().format('YYYY-MM-DD',list['range-picker'][0]) } ~ 结束日期： { moment().format('YYYY-MM-DD',list['range-picker'][1]) } </span> </Col>
          <Col span={2}> <span className={[list.select === 1 ? `${styles.one}`: `${styles.three}`]} ></span> </Col>
          <Col span={6} className={styles.ButtonBox}> 
            <Popconfirm title="Are you sure delete this task?" onConfirm={ () => { this.confirm(list.id) } } onCancel={ () => { this.cancel(key) } } okText="Yes" cancelText="No">
              <Button type="danger" size="small"> 删除 </Button>
            </Popconfirm>
            <Button onClick={ () => {  this.overRude(listArray[key]) } } type="default" size="small"> 逾期 </Button>
            <Button onClick={ () => { this.completeWork(list.id, list) } } type="primary" size="small"> 完成 </Button>
          </Col>
        </Row>
      </li>
    )
    return (
      <ul>
        { listItem }
      </ul>
    )
  }

  render () {
    return (
      <Spin spinning={ this.props.note.loading }>
        <div className={styles.haveListBox}>
          { this.renderList() }
          {/* 修改弹窗 */}
          <Modal visible={this.state.visible} footer={null} onCancel={ () => { this.setState({ visible: false }) } }>
            <EditNoteForm editArray={this.state.editArray} closeForm={this.closeForm}></EditNoteForm>
          </Modal>
        </div>
      </Spin>
    )
  }
}

export default HaveList