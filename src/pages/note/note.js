import React from 'react'
import { Row, Col, Button, Tabs, Icon, Modal } from 'antd'
import styles from '../note/note.css'
import NoteForm from '../note/noteForm'
import HaveList from '../note/haveList'
import CompleteList from '../note/completeList'

class Note extends React.Component {

  state = {
    haveArray: [], // 正在进行中的任务
    completeArray: [], // 已完成的任务
    visible: false, // 显示隐藏新增便签表单
  }

  clearForm = () => {
    this.setState({
      visible: false
    })
    console.log('success')
  }

  render () {
    const TabPane = Tabs.TabPane
    return (
      <div className={styles.noteBox}>
        <Row type="flex" justify="space-between">
          <Col className={styles.newNote} span={6}>
            <Button onClick={ () => { this.setState({ visible: true }) } } type="primary" size="large" > 新增便签 </Button>
          </Col>
          <Col className={styles.noteList} span={18}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><Icon type="meh" /> 进行中 </span>} key="1">
                <HaveList ref="haveList"></HaveList>
              </TabPane>
              <TabPane tab={<span><Icon type="smile" /> 已完成 </span>} key="2">
                <CompleteList></CompleteList>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        {/* 弹窗 */}
        <Modal visible={this.state.visible} footer={null} onCancel={ () => { this.setState({ visible: false }) } }>
          <NoteForm clearForm={this.clearForm}></NoteForm>
        </Modal>
      </div>
    )
  }
}

export default Note