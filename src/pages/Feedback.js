import React from 'react';
import Header from '../component/Header';

class Feedbacks extends React.Component {
  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text">Default</p>
        <p> req14 </p>
      </>
    );
  }
}

export default Feedbacks;
