import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icon from './Icon';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score, settingsPage } = this.props;
    const convertEmail = md5(gravatarEmail).toString();

    return (
      <div className="header">
        <Icon data="icon-header" />
        <div className="player-conteiner">
          <div className="image-name">
            <img className="player-image" src={ `https://www.gravatar.com/avatar/${convertEmail}` } alt="player" data-testid="header-profile-picture" />
            <h3 className="player-name" data-testid="header-player-name">{name}</h3>
          </div>
          <div className="score">
            <FontAwesomeIcon className="star" icon={ solid('star') } />
            <h3
              className="player-score"
              data-testid="header-score"
            >
              { `Pontos: ${score}`}
            </h3>
          </div>
        </div>
        <FontAwesomeIcon
          data-testid="btn-settings"
          icon={ solid('gear') }
          onClick={ settingsPage }
          size="2x"
          className="settings-icon-header"
        />
      </div>
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
  settingsPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
