import styles from './index.css'
// import Link from 'umi/link'
// import router from 'umi/router'
// import { Button } from 'antd'
import { Row, Col } from 'antd'
import "antd/dist/antd.css"
import { Carousel } from 'antd'

export default function(props) {
  return (
    <div className={styles.normal}>
      {/* 轮播图 */}
      <div className={styles.banner}>
        <Carousel vertical autoplay="true" effect="fade">
          <div className={styles.banner}>
            <h1> Hello Fan </h1>
          </div>
          <div className={styles.banner}>
            <h1> Hello Fans </h1>
          </div>
          <div className={styles.banner}>
            <h1> Hello Roy </h1>
          </div>
          <div className={styles.banner}>
            <h1> <a href="http://www.uptechina.com/UniWebView.unitypackage" class="download">  Quick DownLoad </a> </h1>
          </div>
        </Carousel>
      </div>
      <div className={styles.list}>
        <Row type="flex" justify="space-around" align="middle">
          <Col className={styles.orange} span={6}></Col>
          <Col className={styles.purple} span={6}></Col>
          <Col className={styles.blue} span={6}></Col>
        </Row>
      </div>
    </div>
  )
}

// umi 路由跳转测试
// function Test () {
//   router.push('/404')
// }