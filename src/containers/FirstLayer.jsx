import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChoice } from '../actions/index.jsx';


class FirstLayer extends React.Component {
  renderChoices() {
    return this.props.choices.firstLoad.map((choice) => ( 
        <img className="img-responsive"
          key={ choice.img }
          onClick={() => this.props.selectChoice(choice.option, this.props.choices.updatedZipcode, this.props.userdata.userID)}
          src={choice.img} height="250" />
      ));
  }

  render() {
    return (
      <div className="col-sm-4">
        { this.renderChoices() }</div>
    );
  }
}

function mapStateToProps(state) {
    return {
      choices: state.choices,
      userdata: state.userdata,
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectChoice }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(FirstLayer);
