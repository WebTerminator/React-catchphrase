import React, { Component } from 'react';
import './App.css';

import gridItemsCollection from './data.js'

import Grid from './components/Grid/'
import Question from './components/Question'
import Controls from './components/Controls'

import View from './components/view.js'

import generateRandomNumber from './components/Utilities'
import axios from 'axios'

const utilityArray = []
const tempQuestions = []

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: gridItemsCollection,

      intro: true,
      instructions: false,
      grid: false,

      questions: this.props.questions,
      selectedQuestion: ""
    }
  }

  getRandomN = (arr, max) => {
    let s = generateRandomNumber(arr, max)
    return s
  }

  hideGridItem(e) {
    let index = this.getRandomN(utilityArray, gridItemsCollection.length),
        collection = this.state.collection,
        newCollection,
        questions = this.state.questions.questions,
        n = this.getRandomN(tempQuestions, questions.length);

    this.setState({
      newCollection: [ ...collection, collection[index].hidden = true ]
    })

    this.generateNewQuestion(questions[n])
  }

  generateNewQuestion(selectedQuestion) {
    this.setState({
      selectedQuestion
    })
  }

  componentDidMount = () => {
    const questions = this.state.questions.questions
    let randomNumber = this.getRandomN(tempQuestions, questions.length)
    this.generateNewQuestion(questions[randomNumber])
  }

  getAnswer = e => 
    e.target.getAttribute('data-option') == this.state.selectedQuestion.correct_option

  goNext = () => {
    this.setState({
      intro: false,
      grid: true,
    })
  }

  render() {
    const state = this.state
    const { 
      collection, 
      grid, 
      intro, 
      selectedQuestion, 
      buttons
    } = state

    return (
      <div className="wrapper">
        <div className="wrapper-inner">
          <View isVisible={state.intro}>
            <p> Hello and welcome, answer as many questions as possible in 1 min and 30 seconds. </p>
            <button onClick={this.goNext}>Start playing</button>
          </View>
          <View isVisible={state.grid}>
            <Grid gridItemsCollection={collection}/>
            <Question question={selectedQuestion.question} />
            <Controls 
              onClick={this.hideGridItem.bind(this)} 
              gridItemsCollection={collection} 
              answers={selectedQuestion}
              buttons={buttons}
              getAnswer={this.getAnswer}
            />
          </View>
        </div>
      </div>
    );
  }
}

export default App;
