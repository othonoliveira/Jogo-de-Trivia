import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveSettings } from '../redux/actions';
import Icon from '../component/Icon';
import './css/Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      settings: {
        category: '',
        difficulty: '',
        type: '',
      },
    };
  }

  onSelectChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [name]: value,
      },
    }));
  };

  onSaveHandler = async () => {
    const { dispatch, history } = this.props;
    const { settings } = this.state;
    await dispatch(saveSettings(settings));
    history.push('/');
  };

  render() {
    const { categories: { items } } = this.props;

    return (
      <div className="settings gradient">
        <Icon data="icon-settings" />
        <div className="settings-conteiner">
          <h1 className="settings-title" data-testid="settings-title">Settings</h1>
          <div className="settings-selection">
            <select
              name="category"
              id="category"
              onChange={ this.onSelectChangeHandler }
              className="settings-select"
            >
              <option value="">Any Category</option>
              {items.map((category) => (
                <option key={ category.id } value={ category.id }>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              name="difficulty"
              id="difficulty"
              onChange={ this.onSelectChangeHandler }
              className="settings-select"
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              name="type"
              id="type"
              onChange={ this.onSelectChangeHandler }
              className="settings-select"
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </select>

            <button
              type="button"
              onClick={ this.onSaveHandler }
              className="save-button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  categories: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Settings);
