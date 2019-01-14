import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./Progressbar.css";

// https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f


class ProgressBarExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: 0
    }
  }

  render() {
    return (
      <div>
        
        <h2> Reading Progress Bar </h2>
        {this.nextStep}
        <ProgressBar percentage={(this.props.total_read_count/this.props.total_available_count)*100} />

      </div>
    )
  }  
}

const ProgressBar = (props) => {
  return (
      <div className="progress-bar">
        <Filler percentage={props.percentage} />
      </div>
    )
}

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

export default ProgressBarExample;

