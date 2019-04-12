import React from 'react'
import styles from '../note/haveList.css'
import moment from 'moment'
import { Button, Modal } from 'antd'

const confirm = Modal.confirm
class HaveList extends React.Component {

  operateList = (key) => {
    confirm({
      title: '便签删除',
      content: `你确定要删除该条便签数据？`,
      onOk() {
        let listArray = JSON.parse(localStorage.getItem('noteList'))
        listArray.splice(key, 1)
        localStorage.setItem('noteList', JSON.stringify(listArray))
      },
      onCancel() {},
    })
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
      <li key={key} className={styles.list}>
        <p> <span> {list.title} </span> <span> { moment().format('YYYY-MM-DD',list['range-picker'][0]) } ~ { moment().format('YYYY-MM-DD',list['range-picker'][1]) } </span> <span className={[list.select === '1' ? `${styles.one}`: `${styles.three}`]} ></span> <Button onClick={ () => this.operateList(key) } className={styles.operateButton} type="primary" size="small"> 操作 </Button> </p>
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
      </div>
    )
  }
}

export default HaveList