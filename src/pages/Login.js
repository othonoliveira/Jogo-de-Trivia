import React from 'react';

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

  render() {
    const { name, email, disable } = this.state;
    return (
      <>
        <label htmlFor="input-name">
          Nome
          <input
            id="input-name"
            onChange={ this.handleChange }
            name="name"
            type="text"
            value={ name }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-email">
          E-mail
          <input
            id="input-email"
            value={ email }
            onChange={ this.handleChange }
            type="email"
            name="email"
            data-testid="input-gravatar-email"
          />
        </label>
        <button disabled={ disable } data-testid="btn-play" type="button">Play</button>
      </>
    );
  }
}

export default Login;
