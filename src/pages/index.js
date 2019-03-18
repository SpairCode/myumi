import styles from './index.css'
import Link from 'umi/link'


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
      </ul>
    </div>
  );
}
