import PropTypes from 'prop-types';
import React from 'react';

class Icon extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className={ data }>
        <div className="question-marks">
          <p className="question-sign1">?</p>
          <p className="question-sign2">?</p>
          <p className="question-sign3">?</p>
        </div>
        <h1 className="trivia-title">Trivia</h1>
      </div>
    );
  }
}

Icon.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Icon;
