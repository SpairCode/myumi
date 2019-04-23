import React from 'react'
import moment from 'moment'
import { connect } from 'dva'
import router from 'umi/router'
import { Button, Modal, Row, Col } from 'antd'
import styles from '../note/haveList.css'
import NoteForm from '../note/noteForm'

const confirm = Modal.confirm
@connect(({ noteList }) => ({
  noteList
}))
class HaveList extends React.Component {

  state = {
    visible: false, // 逾期修改弹窗
    editArray: [] // 逾期修改数组
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: 'note/fetch',
    })
    console.log(this)
  }

  // 确认是否删除该条数据
  operateList = (key) => {
    const { dispatch } = this.props
    dispatch({
      type: 'note/fetch',
      payload: { key },
    })
    console.log(this)
    confirm({
      title: '便签删除',
      content: `你确定要删除该条便签数据？`,
      onOk() {
        let listArray = JSON.parse(localStorage.getItem('noteList'))
        listArray.splice(key, 1)
        localStorage.setItem('noteList', JSON.stringify(listArray))
        router.push('/note/note') // moment data refresh 
      },
      onCancel() {},
    })
  }

  // 逾期编辑操作
  overRude = (data) => {
    console.warn(data)
    this.setState({
      visible: true,
      editArray: data
    })
    // NoteForm 未设置 initialValue
  }

  // 该条任务已经完成
  completeWork = (key) => {
    const { dispatch } = this.props
    let listData = JSON.parse(localStorage.getItem('noteList'))
    dispatch({
      type: 'note/completeWork',
      payload: {listData, key}
    })
    // 删除该条数据，将改条数数据置入已完成数组
    // 判断已完成数据里面是否存在数据
    let completeData = []
    if (JSON.parse(localStorage.getItem('completeList'))) {
      completeData = JSON.parse(localStorage.getItem('completeList'))
      completeData.push(listData[key])
      localStorage.setItem('completeList', JSON.stringify(completeData))
    } else {
      completeData.push(listData[key])
      localStorage.setItem('completeList', JSON.stringify(completeData))
    }
    listData.splice(key, 1)
    localStorage.setItem('noteList', JSON.stringify(listData))
    router.push('/note/note') // moment data refresh 
  }

  renderList = () => {
    // 判断是否存在List数据
    let listData = JSON.parse(localStorage.getItem('noteList'))
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
          <Col span={2}> <span className={[list.select === '1' ? `${styles.one}`: `${styles.three}`]} ></span> </Col>
          <Col span={6} className={styles.ButtonBox}> 
            <Button onClick={ () => this.operateList(key) } type="danger" size="small"> 操作 </Button>
            <Button onClick={ () => this.overRude(listArray[key]) } type="default" size="small"> 逾期 </Button>
            <Button onClick={ () => { this.completeWork(key) } } type="primary" size="small"> 完成 </Button>
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
      <div className={styles.haveListBox}>
        { this.renderList() }
        {/* 修改弹窗 */}
        <Modal visible={this.state.visible} onCancel={ () => { this.setState({ visible: false }) } }>
          <NoteForm editArray={this.state.editArray}></NoteForm>
        </Modal>
      </div>
    )
  }
}

export default HaveList