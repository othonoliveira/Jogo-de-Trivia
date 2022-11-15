import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icon from '../component/Icon';
import { restartScore } from '../redux/actions';
import './css/Ranking.css';

class Ranking extends React.Component {
  state = {
    playersArray: [],
  };

  async componentDidMount() {
    await this.getInfo();
  }

  getInfo = () => {
    const playersArray = JSON.parse(localStorage.getItem('players'));
    this.setState({ playersArray });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(restartScore());
  };

  render() {
    const { playersArray } = this.state;
    const orderArray = playersArray.sort((a, b) => b.score - a.score);
    const FOUR = 4;
    return (
      <div className="ranking gradient">
        <Icon data="icon-ranking" />
        <div className="ranking-score">
          <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
          <div className="full-scores">
            { orderArray.length > 0
              ? orderArray.slice(0, FOUR).map((player, index) => (
                <div className="player-score-ranking" key={ index }>
                  <img className="ranking-player-image" src={ `https://www.gravatar.com/avatar/${player.imgGravatar}` } alt="avatarImage" />
                  <h3
                    className="ranking-player-name"
                    data-testid={ `player-name-${index}` }
                  >
                    { player.name }
                  </h3>
                  <div
                    className="player-score-value"
                  >
                    <FontAwesomeIcon className="star" icon={ solid('star') } />
                    <h3 data-testid={ `player-score-${index}` }>
                      { `${player.score} pontos`}
                    </h3>
                  </div>
                </div>
              ))
              : null}
          </div>
          <button
            data-testid="btn-go-home"
            onClick={ this.handleClick }
            type="button"
            className="ranking-play-button"
          >
            Play Again!
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
