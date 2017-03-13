import React, { Component, PropTypes } from 'react';

export default class AddGroupInput extends Component {
  static propTypes = {
    addGroup: PropTypes.func.isRequired
  }

  render () {
    return (
      <input
        type="text"
        autoFocus="true"
        placeholder="New Group Name"
        value={this.state.name}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)} />
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
    };
  }

  handleChange (e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit (e) {
    const name = e.target.value.trim();
    if (e.which === 13) {
      this.props.addGroup(name);
      this.setState({ name: '' });
    }
  }

}
