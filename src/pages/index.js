import styles from './index.css'
import Link from 'umi/link'
import router from 'umi/router'
import { Button } from 'antd'
import "antd/dist/antd.css"

export default function(props) {
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>
          <Link to="/user"> User/Index </Link>
        </li>
        <li>
          <Link to="/user/user"> User/User </Link>
        </li>
        <li>
          <Button type="primary" onClick={ Test }>
            Push => ()
          </Button>
        </li>
      </ul>
    </div>
  )
}

// umi 路由跳转测试
function Test () {
  router.push('/404')
}