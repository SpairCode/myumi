import React from 'react'
import Lines from './line'
import Bars from './bar'
import Areas from './area'

class DataAnalysis extends React.Component {

  render () {
    return (
      <div>
        <Lines></Lines>
        <Bars></Bars>
        <Areas></Areas>
      </div>
    )
  }
}

export default DataAnalysis