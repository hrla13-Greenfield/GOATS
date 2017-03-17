import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browse } from '../actions/index.jsx';

class Browse extends React.Component {

componentWillMount(){
  this.props.dispatch(browse())
}
  renderAll(){
    console.log(this.props.choices.showAll.data, 'this.props.choices.showAll')
    return this.props.choices.showAll.data.map((item)=>{
       return (
          <div>
            <div> {item.name} </div>
            <img src={item.image_url} height="250" />
            <div> {item.phone} </div>
            <div> {item.distance} </div>
          </div>
        )
    })
  }
render() {
  if (this.props.choices.showAll !== undefined){
      return (
        <div>
          <div>{this.renderAll()}</div>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ browse }, dispatch);
  }


export default connect(mapStateToProps)(Browse);