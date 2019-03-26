import React from 'react'
import styles from './index.css'
import { Icon, Row, Col } from 'antd'

class Users extends React.Component {
  render () {
    return (
      <div className={styles.userBox}>
        <Row type="flex" justify="space-around">
          <Col span={6}>
            <div className={styles.userBoxs}>
              {/* 用户头像 */}
              <div className={styles.userHeader}>
                <img src='https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2637329911,3521077389&fm=58&bpow=649&bpoh=808' alt='FanImage' title="Age: 22"></img>
              </div>
              {/* 用户姓名 */}
              <div className={styles.userName} title="1598111569@qq.com"> Spair Fan </div>
              {/* 用户箴言 */}
              <div className={styles.userProverbs}> 博观而约取，厚积而薄发 </div>
              {/* Worker */}
              <div className={styles.list}>
                <Icon type="crown" /> <span> Front End Newbie </span>
              </div>
              <div className={styles.list}>
                <Icon type="experiment" /> <span> Umi Test Project </span>
              </div>
              <div className={styles.list}>
                <Icon type="environment" /> <span> WuHan </span>
              </div>
              <div className={styles.list}>
                <Icon type="qq" /> <span> 1598111569 </span>
              </div>
            </div>
          </Col>
          <Col span={17}>
            <div className={styles.userList}>
              <p> UserList </p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users