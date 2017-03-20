import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions.js';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
}) 


class Login extends React.Component {
  constructor(props) {
    super(props);
this.AUTH0_CLIENT_ID = 'prZdyhStrcE55F4qE5C6V0WK7FiovNoo';
this.AUTH0_DOMAIN = 'yangemilym.auth0.com';
this.AUTH0_CALLBACKURL = 'http://localhost:8000/tree';
self = this;
  }


loginWithEmailCode() {
	const lock = new Auth0LockPasswordless(this.AUTH0_CLIENT_ID, this.AUTH0_DOMAIN);
		// lock.emailcode({
		// responseType:'token', 
		// callbackURL: this.AUTH0_CALLBACKURL
    // });
lock.emailcode(function(err, profile, id_token, state){
    if(!err){
        localStorage.setItem('userToken', id_token);
        //send a redux action that sets state.auth.authenticated to true
        // state.auth.user to profile

        window.location.href= "/tree"; 
        self.props.dispatch(UserActions.signIn(profile.email))
        
        if(localStorage.getItem("userToken")){
        }
    }
});
	}



loginWithSocial(){
	const lock = new Auth0LockPasswordless(this.AUTH0_CLIENT_ID, this.AUTH0_DOMAIN);
      		lock.social({
  			  connections: ["facebook", "linkedin"],
  			  responseType: 'token',
  			  callbackURL : this.AUTH0_CALLBACKURL
			}, function(result){
      });
		  }


  render() {
    return (
      <div>
        <span>
          <div className="centerlogin">
          <img src={'./assets/goats.png'} className="img-responsive" ></img>
          </div>
        </span>
        <div className="buttonlogin">
      <button className="btn btn-logincustom btn-lg" onClick={this.loginWithEmailCode.bind(this)}>SIGN IN</button>
      {/*<button onClick={this.loginWithSocial.bind(this)} >Social</button>*/}
      </div>
      </div>
    );
  }
}


export default Login;
