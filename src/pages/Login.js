import React from 'react';
import PropTypes from 'prop-types';

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

  settingsPage = () => {
    const { history } = this.props;
    history.push('/configuracoes');
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
        <button disabled={ disable } data-testid="btn-play" type="button">Play</button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsPage }
        >
          Settings
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
