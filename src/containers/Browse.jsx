import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browse } from '../actions/index.jsx';
import { wantToDo } from '../actions/index.jsx';
import InfiniteScroll from 'redux-infinite-scroll';

class Browse extends React.Component {

 // componentWillMount() {
 // this.props.dispatch(browse(this.props.choices.updatedZipcode));
//}

_loadMore() {
    this.props.dispatch(browse(this.props.choices.updatedZipcode, this.props.choices.showAll.length))
  }

  renderAll() {
    console.log(this.props.choices.showAll, 'this.props.choices.showAll');
    return this.props.choices.showAll.map((item) => (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="thumbnail">
          <div style={{ width: '200px', height:'180px', overflow:'hidden'}}>
            <a href={item.url}><img src={item.image_url} height="180" className="feedPics"/></a>
          </div>
            <div className="caption">
            <h5> {item.name} </h5>
            <h6> {Math.round(item.distance * 0.000621371*100)/100} miles from you </h6>
            <div><button onClick={() => this.props.dispatch(wantToDo(item, this.props.userdata.userID))} className="btn btn-success">I want to do this!</button></div>
          </div>
          </div>
          </div>
        ));
  }
  render() {
  if (this.props.choices.showAll !== undefined){
      return (
        <div>
          <div>{this.renderAll()}</div>
        <div>
        <InfiniteScroll
         loadMore={this._loadMore.bind(this)}
        />
        </div>
        </div>
      );
    } 
      return <div></div>  
  }
}

function mapStateToProps(state) {
  return {
    choices: state.choices,
    userdata: state.userdata,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ browse, wantToDo }, dispatch);
}


export default connect(mapStateToProps)(Browse);

