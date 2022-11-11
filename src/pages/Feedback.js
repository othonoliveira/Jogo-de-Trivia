import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';

// pontuação atual: player.score
// perguntas: assertions

class Feedbacks extends React.Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">Default</p>

        <div className="player-results">
          <h4 data-testid="feedback-total-score">
            { score }
          </h4>
          <h4 data-testid="feedback-total-question">
            { assertions }
          </h4>
        </div>
      </>
    );
  }
}
const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

Feedbacks.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
