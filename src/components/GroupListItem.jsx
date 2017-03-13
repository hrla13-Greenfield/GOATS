import React, { Component, PropTypes } from 'react';

export default class GroupListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onTrashClick: PropTypes.func.isRequired
  }

  render () {
    return (
      <li>
        <div >
          <div><span>{this.props.name}</span></div>
        </div>
        <div >
          <button onClick={() => this.props.deleteGroup(this.props.id)}>
            Delete
          </button>
        </div>
      </li>
    );
  }

}
