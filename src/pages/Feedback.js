import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icon from '../component/Icon';
import './css/Feedback.css';

// pontuação atual: player.score
// perguntas: assertions

class Feedback extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  onBtnClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions, gravatarEmail, name } = this.props;
    const THREE = 3;
    const convertEmail = md5(gravatarEmail).toString();

    return (
      <div className="feedback gradient">
        <Icon data="icon-feedback" />
        <div className="conteiner-results-image">
          <div className="image-div">
            <img
              src={ `https://www.gravatar.com/avatar/${convertEmail}` }
              alt="player"
              data-testid="header-profile-picture"
              className={ `feedback-image ${assertions >= THREE
                ? 'feedback-image-correct'
                : 'feedback-image-incorrect'}` }
            />
          </div>
          <div className="player-results">
            <div className="header">
              <h1 className="name" data-testid="header-player-name">{name}</h1>
              <p className="header-score" data-testid="header-score">{score}</p>
            </div>
            { assertions < THREE ? (
              <p
                className="result-label result-label-bad"
                data-testid="feedback-text"
              >
                Could be better...
              </p>
            ) : (
              <h1
                className="result-label result-label-good"
                data-testid="feedback-text"
              >
                Well Done!
              </h1>
            )}

            <div className="total-score">
              <p>Quantidade de acertos:</p>
              <h2 data-testid="feedback-total-score">
                { score }
              </h2>
            </div>
            <div className="total-question">
              <p>Total de pontos:</p>
              <h2 data-testid="feedback-total-question">
                { assertions}
              </h2>
            </div>

          </div>
        </div>
        <div className="feedback-buttons">
          <button
            onClick={ this.handleClick }
            type="button"
            data-testid="btn-play-again"
            className="play-again-button"
          >
            Play Again
          </button>

          <button
            onClick={ this.onBtnClick }
            type="button"
            data-testid="btn-ranking"
            className="ranking-button"
          >
            Ranking
          </button>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
  assertions: globalState.player.assertions,
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
