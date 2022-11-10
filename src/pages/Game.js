import PropTypes from 'prop-types';
import React from 'react';
import { fetchAPI } from '../services/Api';

import '../App.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    const QUANTITY = 5;
    const questions = await fetchAPI(QUANTITY);

    if (questions.length === 0) return history.push('/');

    this.setState({ questions });
  }

  randomizeAnswers = (arr) => {
    const NUM = 0.5;
    const shuffledArray = arr.sort(() => NUM - Math.random());

    return shuffledArray;
  };

  render() {
    const { questions, index } = this.state;

    return (
      <main>
        <h1>Game</h1>
        <div>
          {questions.map((q, i) => {
            if (i === index) {
              return (
                <div key={ q.question }>
                  <p data-testid="question-category">{ q.category }</p>
                  <p data-testid="question-text">{ q.question }</p>
                  <div data-testid="answer-options" className="answer-options">
                    {this.randomizeAnswers([...q.incorrect_answers, q.correct_answer])
                      .map((a, idx) => (
                        <button
                          key={ a }
                          className={ `answer ${a === q.correct_answer
                            ? 'answer--correct'
                            : ''}` }
                          data-testid={ a === q.correct_answer
                            ? 'correct-answer'
                            : `wrong-answer-${idx}` }
                          type="button"
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
              this.setState({ index: index + 1 }, () => {
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
