import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browse, wantToDo } from '../actions/index.jsx';
import InfiniteScroll from 'redux-infinite-scroll';
import * as UserActions from '../actions/UserActions';
class Browse extends React.Component {

 // componentWillMount() {
 // this.props.dispatch(browse(this.props.choices.updatedZipcode));
// }

  _loadMore() {
    this.props.dispatch(
      browse(this.props.choices.updatedZipcode, this.props.choices.showAll.length),
      );
  }
  wantToDo(item) {
    const self = this;
    this.props.dispatch(wantToDo(item, self.props.userdata.userID, self.props.userdata.username));
    this.props.dispatch(UserActions.signIn(self.props.userdata.username));
  }

  renderAll() {
    return this.props.choices.showAll.map(item => (
      <div className="col-md-4 col-sm-6 col-xs-12" height="300px">

        <div className="thumbnail">
          <div style={{ margin: "0 auto", width: '200px', height: '180px', overflow: 'hidden' }}>
            <a href={item.url}>
            <img src={item.image_url} height="180px" className="feedPics" /></a>
          </div>
        
          <div className="caption" >
            <div style={{ width: '350px', height: '180px', overflow: 'hidden' }}>
            <h5> {item.name} </h5>
            <h6> Description:{ item.categories.map(item => (<div>{item.title}</div>)) } </h6>
            <h6> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </h6>
            
            {item.name === this.props.userdata.current.name ?
            (<div className="browsecenter">
              <button className="btn btn-browseselect">Selected</button></div>) :
            (<div className="browsecenter">
              <button onClick={() => this.wantToDo(item)} className="btn btn-browsebutton">
                I want to do this!</button></div>)}
                </div>
          </div>
        </div>
      </div>
   
  
  

        ));
  }
  render() {
    if (this.props.choices.showAll !== undefined) {
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
    return <div />;
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

