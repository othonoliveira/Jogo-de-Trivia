import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const convertEmail = md5(gravatarEmail).toString();

    return (
      <header>
        <h1>Trivia Game</h1>

        <img src={ `https://www.gravatar.com/avatar/${convertEmail}` } alt="player" data-testid="header-profile-picture" />

        <h3 data-testid="header-player-name">{name}</h3>

        <h3 data-testid="header-score">{ `${score}`}</h3>

      </header>
    );
  }
}
const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
