import React from 'react'
import style from '../footer/footer.css'

class Footers extends React.Component {
  render () {
    return (
      <div className={style.footer}>
        <p data-design={`Design By All`} data-email="spairfan@126.com"></p>
      </div>
    )
  }
}

export default Footers