import PropTypes from 'prop-types';
import React from 'react';

class Options extends React.Component {
  render() {
    const { disabled, answers, q, i, guess, onGuessHandler } = this.props;
    const options = ['https://cdn-user-icons.flaticon.com/84900/84900246/1668459937451.svg?token=exp=1668460866~hmac=a7c06a22bfad1fa2a9302212b3a86e5d', 'https://cdn-user-icons.flaticon.com/84900/84900246/1668460336690.svg?token=exp=1668461238~hmac=4709ee1fb8174c3eac3ef9b8a7845333', 'https://cdn-user-icons.flaticon.com/84900/84900246/1668460437801.svg?token=exp=1668461339~hmac=9b9254c3cd44832348f32a0bb1f3bcec', 'https://cdn-user-icons.flaticon.com/84900/84900246/1668460533423.svg?token=exp=1668461434~hmac=8e8204eedd87bf4a5e77a39c6cd4dea8'];
    const checks = ['https://cdn-user-icons.flaticon.com/84900/84900246/1668461618113.svg?token=exp=1668462519~hmac=313ddcdd1e531a42e073ea335a132cb0', 'https://cdn-user-icons.flaticon.com/84900/84900246/1668461950395.svg?token=exp=1668462851~hmac=849275c72c497982857d14345a1b73de'];
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
                  <img
                    className="symbol"
                    src={ `${options[idx]}` }
                    alt="options"
                  />
                </div>
              ) : (
                <div
                  className={ a === q.correct_answer
                    ? 'symbolCorrect' : 'symbolIncorrect' }
                >
                  <img
                    className="symbol"
                    src={ a === q.correct_answer
                      ? `${checks[0]}` : `${checks[1]}` }
                    alt="checks"
                  />
                </div>
              )}
              <div className="option-text">
                { a }
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
