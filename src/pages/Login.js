import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icon from '../component/Icon';
import { getCategories, savePlayer } from '../redux/actions';
import { getToken } from '../services/Api';
import './css/Login.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disable: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCategories());
  }

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

  BtnClick = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const infoPlayer = { name, email };
    dispatch(savePlayer(infoPlayer));
    const token = await getToken();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { name, email, disable } = this.state;
    return (
      <div className="gradient">
        <FontAwesomeIcon
          data-testid="btn-settings"
          onClick={ this.settingsPage }
          icon={ solid('gear') }
          size="2x"
          className="settings-icon-login"
        />
        <Icon data="icon-login" />
        <div className="inputs-conteiner">
          <input
            className="login-input-email"
            value={ email }
            onChange={ this.handleChange }
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Qual é o seu e-mail do gravatar?"
          />
          <input
            className="login-input-name"
            onChange={ this.handleChange }
            name="name"
            type="text"
            value={ name }
            placeholder="Qual é o seu nome?"
            data-testid="input-player-name"
          />
          <button
            className="login-button"
            disabled={ disable }
            data-testid="btn-play"
            type="button"
            onClick={ this.BtnClick }
          >
            Play
          </button>
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
