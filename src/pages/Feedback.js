import React from 'react';
import Header from '../component/Header';

class Feedbacks extends React.Component {
  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text">Default</p>
      </>
    );
  }
}

export default Feedbacks;
