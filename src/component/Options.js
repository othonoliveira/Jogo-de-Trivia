import PropTypes from 'prop-types';
import React from 'react';
import { decode } from 'html-entities';
import GameIcons from './GameIcons';

class Options extends React.Component {
  render() {
    const { disabled, answers, q, i, guess, onGuessHandler } = this.props;
    const options = ['a', 'b', 'c', 'd'];
    const checks = ['check', 'xmark'];
    console.log(answers);
    return (
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
            onClick={ () => onGuessHandler(true, a) }
            disabled={ disabled }
          >
            <div className="button-content">
              {guess === false ? (
                <div className="symbol-conteiner">
                  <GameIcons icon={ options[idx] } />
                </div>
              ) : (
                <div
                  className={ a === q.correct_answer
                    ? 'symbolCorrect' : 'symbolIncorrect' }
                >
                  <GameIcons icon={ a === q.correct_answer ? checks[0] : checks[1] } />
                </div>
              )}
              <div className="option-text">
                { decode(a) }
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }
}

Options.propTypes = {
  disabled: PropTypes.bool.isRequired,
  q: PropTypes.shape({ correct_answer: PropTypes.string.isRequired }).isRequired,
  i: PropTypes.number.isRequired,
  guess: PropTypes.bool.isRequired,
  onGuessHandler: PropTypes.func.isRequired,
};

Options.propTypes = {}.isRequired;

export default Options;
