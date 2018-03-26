import React, { Component } from 'react';
import './styles/App.scss';

import gridItemsCollection from './data.js'

import Grid from './components/Grid/'
import Question from './components/Question'
import Controls from './components/Controls'

import View from './components/view.js'

import generateRandomNumber from './components/Utilities'
import axios from 'axios'
import ReactCountdownClock from 'react-countdown-clock'

const utilityArray = []
const tempQuestions = []
const finalQuestion = {
  "question":"Whic city is it?",
  "option_1":"London",
  "option_2":"Rome",
  "option_3":"Paris",
  "option_4":"Berlin",
  "correct_option": 1
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: gridItemsCollection,

      intro: true,
      instructions: false,
      grid: false,

      questions: this.props.questions,
      selectedQuestion: "",
      result: 0
    }
  }

  getRandomN = (arr, max) => {
    let s = generateRandomNumber(arr, max)
    return s
  }

  getNewQuestion = () => {
    const questions = this.state.questions.questions
    let randomNumber = this.getRandomN(tempQuestions, questions.length)
    this.generateNewQuestion(questions[randomNumber])
  }

  increaseCount = () => {
    this.setState({
      result: this.state.result + 1
    })
  }

  decreaseCount = () => {
    this.setState({
      result: this.state.result - 1
    })
  }

  hideGridItem(e) {
    let index = this.getRandomN(utilityArray, gridItemsCollection.length),
        collection = this.state.collection,
        newCollection;

    this.setState({
      newCollection: [ ...collection, collection[index].hidden = true ]
    })

    this.getNewQuestion()
  }

  generateNewQuestion(selectedQuestion) {
    this.setState({
      selectedQuestion
    })
  }

  componentDidMount = () => {
    const questions = this.state.questions.questions
    this.getNewQuestion()
  }

  getAnswer = e => 
    e.target.getAttribute('data-option') == this.state.selectedQuestion.correct_option

  goNext = () => {
    this.setState({
      intro: false,
      grid: true,
    })
  }
  myCallback = () => {
    this.generateNewQuestion(finalQuestion)
  }

  render() {
    const state = this.state
    const { 
      collection, 
      grid, 
      intro, 
      selectedQuestion, 
      buttons,
      result,
      increaseCount,
      decreaseCount
    } = state

    return (
      <div className="wrapper">
        <div className="wrapper-inner">
          <View className="intro-title" isVisible={state.intro}>
            <p> Hello and welcome, answer as many questions as possible in 1 min and 30 seconds. </p>
            <button onClick={this.goNext}>Start playing</button>
          </View>
          <View isVisible={state.grid}>
            <div className="flex info-wrapper">
              <p>Current score: {result}</p>
              { state.grid ?
                <ReactCountdownClock 
                  seconds={90}
                  color="#000"
                  alpha={0.9}
                  size={50} 
                  onComplete={this.myCallback} 
                />
                :
                null
              }
            </div>
            <Grid gridItemsCollection={collection} />
            <Question question={selectedQuestion.question} />
            <Controls 
              hideGridItem={this.hideGridItem.bind(this)} 
              gridItemsCollection={collection} 
              answers={selectedQuestion}
              buttons={buttons}
              getAnswer={this.getAnswer}
              getNewQuestion={this.getNewQuestion}
              increaseCount={this.increaseCount}
              decreaseCount={this.decreaseCount}
            />
          </View>
        </div>
      </div>
    );
  }
}

export default App;
