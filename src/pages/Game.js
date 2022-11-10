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
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    const QUANTITY = 5;
    const questions = await fetchAPI(QUANTITY);

    questions.forEach((q) => {
      const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = q;
      const answers = this.randomizeAnswers([...incorrectAnswers, correctAnswer]);
      this.setState((prevState) => ({ answers: [...prevState.answers, answers] }));
    });

    if (questions.length === 0) return history.push('/');

    this.setState({ questions });
  }

  randomizeAnswers = (arr) => {
    const NUM = 0.5;
    const shuffledArray = arr.sort(() => NUM - Math.random());

    return shuffledArray;
  };

  onGuessHandler = (bool) => {
    this.setState({ guess: bool });
  };

  render() {
    const { questions, index, guess, answers } = this.state;

    return (
      <main>
        <Header />
        <div>
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
                        onClick={ () => this.onGuessHandler(true) }
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

          <button
            type="button"
            onClick={ () => {
              this.setState({ index: index + 1, guess: false }, () => {
                const { index: newIndex } = this.state;
                if (newIndex === questions.length) {
                  this.setState({ index: 0 });
                }
              });
            } }
          >
            Next

          </button>
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
