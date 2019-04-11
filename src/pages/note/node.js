import React from 'react'
import styles from '../note/note.css'

class Note extends React.Component {
  render () {
    return (
      <div className={styles.noteBox}>
        <p> Note </p>
      </div>
    )
  }
}

export default Note