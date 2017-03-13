import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import GroupListItem from './GroupListItem.jsx';

export default class GroupList extends Component {
  static propTypes = {
    currentGroups: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render () {
    return (
      <ul>
        {
          _.mapValues(this.props.currentGroups, (group) => {
            return (<GroupListItem
              key={group.id}
              id={group.id}
              name={group.name}
              {...this.props.actions} />);
          })
        }
      </ul>
    );
  }

}
