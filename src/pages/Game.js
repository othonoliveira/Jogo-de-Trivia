import PropTypes from 'prop-types';
import React from 'react';
import Header from '../component/Header';
import { fetchAPI } from '../services/Api';

import './css/Game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
      index: 0,
      guess: false,
      count: 30,
      score: 0,
      disabled: false,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const FIVE = 5;

    const QUANTITY = 5;
    const questions = await fetchAPI(QUANTITY);

    questions.slice(0, FIVE).forEach((q) => {
      const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = q;
      const answers = this.randomizeAnswers([...incorrectAnswers, correctAnswer]);
      this.setState((prevState) => ({ answers: [...prevState.answers, answers] }));
    });

    if (questions.length === 0) return history.push('/');

    this.setState({ questions });

    const SECOND = 1000;
    setInterval(this.counter, SECOND);
  }

  counter = () => {
    const { count } = this.state;
    if (count === 0) {
      this.setState({ disabled: true, count: 30, guess: true });
    } else {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    }
  };

  randomizeAnswers = (arr) => {
    const NUM = 0.5;
    const shuffledArray = arr.sort(() => NUM - Math.random());

    return shuffledArray;
  };

  onGuessHandler = (bool, value) => {
    const { questions, index } = this.state;
    this.setState({ guess: bool });

    if (value === questions[index].correct_answer) {
      const SCORE = 10;
      this.setState((prevState) => ({ score: prevState.score + SCORE }));
    }

    this.setState({ count: 3 });
    const THREE_SECONDS = 3000;
    setTimeout(() => {
      this.handleNext();
    }, THREE_SECONDS);
  };

  handleNext = () => {
    const { history } = this.props;
    const { index, questions } = this.state;
    this.setState({ index: index + 1, guess: false, count: 30 }, () => {
      const { index: newIndex } = this.state;
      if (newIndex === questions.length) {
        history.push('/feedbacks');
      }
    });
  };

  render() {
    const { questions, index, guess, answers, count, score, disabled } = this.state;

    return (
      <main>
        <Header />
        <div>
          <p>
            Score:
            {' '}
            {score}
          </p>
          <p>
            Timer:
            {' '}
            {count}
          </p>
          {questions.map((q, i) => {
            if (i === index) {
              return (
                <div key={ q.question }>
                  <p data-testid="question-category">{ q.category }</p>
                  <p data-testid="question-text">{ q.question }</p>
                  <div data-testid="answer-options" className="answer-options">
                    {answers[i].map((a, idx) => (
                      <button
                        key={ a }
                        data-testid={ a === q.correct_answer
                          ? 'correct-answer'
                          : `wrong-answer-${idx}` }
                        className={ `option ${guess && (
                          a === q.correct_answer
                            ? 'optionCorrect'
                            : 'optionIncorrect')}` }
                        type="button"
                        onClick={ () => this.onGuessHandler(true, a) }
                        disabled={ disabled }
                      >
                        { a }

                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
          { guess ? (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.handleNext }
            >
              Next

            </button>)
            : ''}

          {/* <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleNext }
          >
            Next

          </button> */}
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
