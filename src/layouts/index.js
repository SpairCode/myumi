import styles from './index.css';
import Header from '../pages/header/index'
import Footers from '../pages/footer/footer'

function BasicLayout(props) {
  if (props.location.pathname === '/login/login') {
    return <div>{ props.children }</div>
  } else {
    return (
      <div className={styles.normal}>
        <Header></Header>
        <div className={styles.content}>
        { props.children }
        </div>
        <Footers></Footers>
      </div>
    )
  }

}

export default BasicLayout
