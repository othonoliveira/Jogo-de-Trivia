import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { decode } from 'html-entities';
import { connect } from 'react-redux';
import Header from '../component/Header';
import Options from '../component/Options';
import { savePoints } from '../redux/actions';
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
      disabled: false,
    };
  }

  async componentDidMount() {
    const { history, settings, game } = this.props;
    if (game) history.push('/');
    const FIVE = 5;

    const QUANTITY = 5;
    const questions = await fetchAPI(QUANTITY, settings);

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
    const { count, guess } = this.state;
    if (count === 0) {
      this.setState({ disabled: true, count: 30, guess: true });
    } else if (guess) {
      this.setState({ count });
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
    this.setState({ disabled: true, guess: bool });

    if (value === questions[index].correct_answer) {
      this.getScore();
    }
  };

  handleNext = () => {
    const { history } = this.props;
    const { index, questions } = this.state;
    this.setState({ disabled: false, index: index + 1, guess: false, count: 30 }, () => {
      const { index: newIndex } = this.state;
      if (newIndex === questions.length) {
        history.push('/feedback');
      }
    });
  };

  getDifficults = (difficulty) => {
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    if (difficulty === 'hard') return HARD;
    if (difficulty === 'medium') return MEDIUM;
    if (difficulty === 'easy') return EASY;
  };

  getScore = () => {
    const { index, questions, count } = this.state;
    const { dispatch, prevScore, assertions } = this.props;
    const { difficulty } = questions[index];
    const TEN = 10;

    const score = (TEN + (count * this.getDifficults(difficulty))) + prevScore;
    dispatch(savePoints({ score, assertions: assertions + 1 }));
  };

  settingsPage = () => {
    const { history } = this.props;
    history.push('/configuracoes');
  };

  render() {
    const { questions, index, guess, answers, count, disabled } = this.state;
    return (
      <div className="gradient">
        <Header settingsPage={ this.settingsPage } />
        {questions.map((q, i) => {
          if (i === index) {
            return (
              <div className="game" key={ q.question }>
                <div className="question-info">
                  <p
                    className="question-category"
                    data-testid="question-category"
                  >
                    { q.category }
                  </p>
                  <p
                    className="current-question"
                    data-testid="question-text"
                  >
                    { decode(q.question) }
                  </p>
                  <div className="timer">
                    <FontAwesomeIcon
                      icon={ solid('clock') }
                      className="timer-icon"
                    />
                    <p className="time-counter">
                      Timer:
                      {' '}
                      {count}
                    </p>
                  </div>
                </div>
                <div className="buttons">
                  <Options
                    guess={ guess }
                    i={ i }
                    q={ q }
                    disabled={ disabled }
                    answers={ answers }
                    onGuessHandler={ this.onGuessHandler }
                  />
                  <button
                    data-testid={ guess && 'btn-next' }
                    type="button"
                    onClick={ this.handleNext }
                    className="next-button"
                    disabled={ !guess }
                  >
                    Next
                  </button>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

    );
  }
}

const mapStateToProps = (globalState) => ({
  prevScore: globalState.player.score,
  settings: globalState.settings,
  assertions: globalState.player.assertions,
  game: globalState.player.game,
});

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.instanceOf(Object).isRequired,
  prevScore: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  game: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
