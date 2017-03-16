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
      <div className="jumbotron">
      <h3>Where should your next adventure take place?</h3>
      <form onSubmit={this.handleSubmit.bind(this)}>
       <input type="text" onChange={this.handleChange.bind(this)} placeholder="zipcode goes here"/>
       <input type="submit" value="enter" className="btn btn-info btn-sm"/>
       </form>
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