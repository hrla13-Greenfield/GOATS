import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browse } from '../actions/index.jsx';

class Browse extends React.Component {

componentWillMount(){
  this.props.dispatch(browse(this.props.choices.updatedZipcode))
}
  renderAll(){
    console.log(this.props.choices.showAll.data, 'this.props.choices.showAll')
    return this.props.choices.showAll.data.map((item)=>{
       return (
          <div className="col-md-4 col-sm-6 col-xs-12">
           <div className="thumbnail">
            <div style={{width: '200px', height:'180px', overflow:'hidden'}}>
            <img src={item.image_url} height="180" className="feedPics"/>
            </div>
            <div className="caption">
            <h5> {item.name} </h5>
            <h6> {Math.round(item.distance * 0.000621371*100)/100} miles from you </h6>
            <div><button className="btn btn-success">I want to do this!</button></div>
          </div>
          </div>
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


/*<div class="row">
  <div class="col-sm-6 col-md-4">
    <div class="thumbnail">
      <img src="..." alt="...">
      <div class="caption">
        <h3>Thumbnail label</h3>
        <p>...</p>
        <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
      </div>
    </div>
  </div>
</div>*/