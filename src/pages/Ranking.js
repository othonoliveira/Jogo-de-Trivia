import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { restartScore } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    imgGravatar: 0,
    playersArray: [],
  };

  componentDidMount() {
    this.fetchGravatarImg();
    this.savePlayer();
  }

  fetchGravatarImg = () => {
    const { gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    this.setState({ imgGravatar: hash });
  };

  savePlayer = () => {
    const { imgGravatar } = this.state;
    const { name, score } = this.props;
    const newPlayer = { name, score, imgGravatar };
    if (!JSON.parse(localStorage.getItem('players'))) {
      this.setState(
        (prev) => (
          { playersArray: [...prev.playersArray, newPlayer] }),
        () => {
          const { playersArray } = this.state;
          localStorage.setItem('players', JSON.stringify(playersArray));
        },
      );
    } else {
      const players = JSON.parse(localStorage.getItem('players'));
      this.setState(
        { playersArray: [...players, newPlayer] },
        () => {
          const { playersArray } = this.state;
          localStorage.setItem('players', JSON.stringify(playersArray));
        },
      );
    }
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(restartScore());
  };

  render() {
    const { playersArray } = this.state;
    const orderArray = playersArray.sort((a, b) => b.score - a.score);
    return (
      <div>
        <title data-testid="ranking-title"> Ranking </title>
        <h1>Ranking</h1>
        <ol>
          { orderArray.length > 0
            ? orderArray.map((player, index) => (
              <li key={ index }>
                <img src={ `https://www.gravatar.com/avatar/${player.imgGravatar}` } alt="avatarImage" />
                <h3 data-testid={ `player-name-${index}` }>{ player.name }</h3>
                <h3 data-testid={ `player-score-${index}` }>{ player.score }</h3>
              </li>
            ))
            : null}
        </ol>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
          type="button"
        >
          Play Again!
        </button>
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
