import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../services/Api';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disable: true,
  };

  activeButton = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.activeButton);
  };

  BtnClick = async () => {
    const { history } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { name, email, disable } = this.state;
    return (
      <>
        <input
          onChange={ this.handleChange }
          name="name"
          type="text"
          value={ name }
          data-testid="input-player-name"
        />
        <input
          value={ email }
          onChange={ this.handleChange }
          type="email"
          name="email"
          data-testid="input-gravatar-email"
        />
        <button
          disabled={ disable }
          data-testid="btn-play"
          type="button"
          onClick={ this.BtnClick }
        >
          Play

        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
