import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitLocation } from '../actions/index.jsx';


class Location extends React.Component {
  constructor(props){
    super(props) 
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 handleChange(event) {
   var self = this;
   self.setState({
     value: event.target.value,
   })
 }

 handleSubmit(){
   this.props.submitLocation(this.state.value)
 }

   render() {
    return (
      <div className="centerdiv">
      <div className="jumbotron">
      <h2 className="orange centerHeading">Where should GOATS take you next?</h2>
      <div className="spaceSmall"></div>
      <form onSubmit={this.handleSubmit.bind(this)}>
       <input type="text" onChange={this.handleChange.bind(this)} placeholder="zipcode goes here" className="zipInput"/>
        <div className="spaceSmall"></div>
       <input type="submit" value="enter" className="btn btn-sm searchButton zipInput"/>
       </form>
      </div>
      <div className="goatsanimate">
      <img src={"./assets/goatssolo.png"} height="250px"></img>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      choices: state.choices,
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ submitLocation }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Location);