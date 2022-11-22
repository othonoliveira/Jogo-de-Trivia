import PropTypes from 'prop-types';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class GameIcons extends React.Component {
  render() {
    const { icon } = this.props;
    if (icon === 'a') {
      return (
        <FontAwesomeIcon
          data-testid="btn-settings"
          icon={ solid('a') }
          className="symbol"
        />
      );
    }
    if (icon === 'b') {
      return (
        <FontAwesomeIcon
          data-testid="btn-settings"
          icon={ solid('b') }
          className="symbol"
        />
      );
    }
    if (icon === 'c') {
      return (
        <FontAwesomeIcon
          data-testid="btn-settings"
          icon={ solid('c') }
          className="symbol"
        />
      );
    }
    if (icon === 'd') {
      return (
        <FontAwesomeIcon
          data-testid="btn-settings"
          icon={ solid('d') }
          className="symbol"
        />
      );
    }
    if (icon === 'check') {
      return (
        <FontAwesomeIcon
          data-testid="btn-settings"
          icon={ solid('check') }
          className="symbol"
        />
      );
    }
    if (icon === 'xmark') {
      return (
        <FontAwesomeIcon
          data-testid="btn-settings"
          icon={ solid('xmark') }
          className="symbol"
        />
      );
    }
  }
}

GameIcons.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default GameIcons;
