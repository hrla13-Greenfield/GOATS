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
      <h3>Where should GOATS take you next?</h3>
      <form onSubmit={this.handleSubmit.bind(this)}>
       <input type="text" onChange={this.handleChange.bind(this)} placeholder="zipcode goes here"/>
       <input type="submit" value="enter" className="btn btn-info btn-sm"/>
       </form>
      </div>
      <div className="center">
      <img src={"./assets/goatssolo.png"} height="400px"></img>
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