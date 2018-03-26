import React, { Component } from 'react'

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button1: 'default',
      button2: 'default',
      button3: 'default',
      button4: 'default'
    }
  }

  handleClick = e => {
    const ev = e.target
    const optionN = ev.getAttribute('data-option')
    const button = "button" + optionN
    const SPEED = 2000
    const { 
      hideGridItem, 
      getNewQuestion, 
      increaseCount, 
      decreaseCount 
    } = this.props

    if(this.props.getAnswer(e)) {
      increaseCount()
      this.setState({
        [button] : 'green'
      }, () => {
        setTimeout(() => {
         hideGridItem()
        }, SPEED)
      })
    }
    else {
      decreaseCount()
      this.setState({
        [button] : 'red'
      })
    }
    setTimeout(() => { 
      this.setState({
        [button] : 'grey'
      })
      getNewQuestion()
    }, SPEED);
  }
  render() {
    const props = this.props
    const { answers } = this.props
    const state = this.state
    return (
      <div className="controls">
        <button 
          onClick={this.handleClick} 
          className={ "button " + state.button1} 
          data-option="1">
            {answers.option_1}
        </button>
        <button 
          onClick={this.handleClick} 
          className={ "button " + state.button2} 
          data-option="2">
            {answers.option_2}
        </button>
        <button 
          onClick={this.handleClick} 
          className={ "button " + state.button3} 
          data-option="3">
            {answers.option_3}
        </button>
        <button 
          onClick={this.handleClick} 
          className={ "button " + state.button4} 
          data-option="4">
            {answers.option_4}
        </button>
      </div>
    )
  }
}

export default Controls;
