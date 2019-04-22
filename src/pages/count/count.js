import React from 'react'
import { Button } from 'antd'
import { connect } from 'dva'

class Count extends React.Component {

  componentDidMount () {
    console.log(this)
  }

  render (props) {
    const { dispatch } = this.props
    return (
      <div>
        <Button type="primary" onClick={() => { dispatch({type: 'count/add'})}}> + </Button> { this.props.count.count } <Button type="danger" onClick={() => { dispatch({type: 'count/minus'})}}> - </Button>
      </div>
    )
  }
}

export default connect(({ count }) => ({
    count,
  }))(Count)