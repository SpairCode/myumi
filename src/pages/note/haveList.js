import React from 'react'
import moment from 'moment'
import { connect } from 'dva'
// import router from 'umi/router'
import { Button, Modal, Row, Col, Spin } from 'antd'
import styles from '../note/haveList.css'
import NoteForm from '../note/noteForm'

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
    console.log(this)
  }

  componentWillUnmount () {
    console.log('减少内存泄漏操作')
  }

  // 确认是否删除该条数据
  operateList = (key) => {
    console.log(key)
  }

  // 逾期编辑操作
  overRude = (data) => {
    this.setState({
      visible: true,
      editArray: data
    })
    // NoteForm 未设置 initialValue
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
            <Button onClick={ () => this.operateList(key) } type="danger" size="small"> 操作 </Button>
            <Button onClick={ () => this.overRude(listArray[key]) } type="default" size="small"> 逾期 </Button>
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
          <Modal visible={this.state.visible} onCancel={ () => { this.setState({ visible: false }) } }>
            <NoteForm editArray={this.state.editArray}></NoteForm>
          </Modal>
        </div>
      </Spin>
    )
  }
}

export default HaveList