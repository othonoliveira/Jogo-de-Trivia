import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <title data-testid="ranking-title"> Ranking </title>
        <h1>Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
          type="button"
        >
          Start
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect()(Ranking);
