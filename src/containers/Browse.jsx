import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'redux-infinite-scroll';
import { browse, wantToDo } from '../actions/index.jsx';
import * as UserActions from '../actions/UserActions';

class Browse extends React.Component {

//loadMore is necessary for InfiniteScroll in the browser feed
  _loadMore() {
    this.props.dispatch(
//this part calls the browse function with current zipcode and the showAll payload from the actionhandlers
      browse(this.props.choices.updatedZipcode, this.props.choices.showAll.length),
    );
  }
  //this function stores the activity in the userhistroies table and also as the current item on the userID
  wantToDo(item) {
    const self = this;
    this.props.dispatch(wantToDo(item, self.props.userdata.userID, self.props.userdata.username));
  //this function makes sure that the selected item automatically refreshes in the userprofile, current item and history
  this.props.dispatch(UserActions.signIn(self.props.userdata.username));
  }

  renderAll() {
    return this.props.choices.showAll.map((item, idx) => (
      <div key={idx} className="col-md-4 col-sm-6 col-xs-12" height="300px">
        <div className="thumbnail">
          <div style={{ margin: '0 auto', width: '200px', height: '180px', overflow: 'hidden' }}>
            <a href={item.url}>
              <img src={item.image_url} height="180px" className="feedPics" /></a>
          </div>

          <div className="caption" >
            <div style={{ width: '350px', height: '180px', overflow: 'hidden' }}>
              <h5> {item.name} </h5>
              <h6> Description:{item.categories.map((item, idx) => (<div key={idx}>{item.title}</div>))} </h6>
              <h6> {Math.round(item.distance * 0.000621371 * 100) / 100} miles from you </h6>
              {/*{//this function handles the button and its changing state to Selected}*/}
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

