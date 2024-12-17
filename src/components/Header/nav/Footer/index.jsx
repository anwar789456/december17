import styles from './style.module.scss';
import Magnetic from '../../../../common/Magnetic'

export default function index() {
  return (
    <div className={styles.footer}>
      <Magnetic>
        <a>Instagram @samet.home</a>
      </Magnetic>
      
      <Magnetic>
        <a>Facebook Samet Home</a>
      </Magnetic>
      
      <Magnetic>
        <a>Linkedin Samet Home</a>
      </Magnetic>
    </div>
  )
}
