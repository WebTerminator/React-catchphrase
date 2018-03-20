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

  showButtonBGColor = color => {
    switch (color) {
      case 'default':
        return 'grey';
        break;
      case 'correct':
        return 'green';
        break;
      case 'incorrect':
        return 'red';
        break;
    }
  }

  handleClick = e => {
    const ev = e.target
    const optionN = ev.getAttribute('data-option')
    const button = "button" + optionN
    const SPEED = 1000

    // hide a single grid item
    this.props.onClick()

    if(this.props.getAnswer(e)) {
      this.setState({
        [button] : 'correct'
      })
    }
    else {
      this.setState({
        [button] : 'incorrect'
      })
    }
    setTimeout(() => { 
      this.setState({
        [button] : 'default'
      })
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
          className={ "button " + this.showButtonBGColor(state.button1)} 
          data-option="1">
            {answers.option_1}
        </button>
        <button 
          onClick={this.handleClick} 
          className={ "button " + this.showButtonBGColor(state.button2)} 
          data-option="2">
            {answers.option_2}
        </button>
        <button 
          onClick={this.handleClick} 
          className={ "button " + this.showButtonBGColor(state.button3)} 
          data-option="3">
            {answers.option_3}
        </button>
        <button 
          onClick={this.handleClick} 
          className={ "button " + this.showButtonBGColor(state.button4)} 
          data-option="4">
            {answers.option_4}
        </button>
      </div>
    )
  }
}

export default Controls;
