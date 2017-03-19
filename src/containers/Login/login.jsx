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
      console.log(profile);
        localStorage.setItem('userToken', id_token);
        //send a redux action that sets state.auth.authenticated to true
        // state.auth.user to profile

        window.location.href= "/tree"; 
        self.props.dispatch(UserActions.signIn(profile.email))
        
        console.log(profile.nickname, "profile")
        console.log(id_token, "id token")
        console.log(state, "this is state")
        if(localStorage.getItem("userToken")){
          console.log("true")
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
        console.log(result)
      });
		  }


  render() {
    return (
      <div> 
      <button onClick={this.loginWithEmailCode.bind(this)}>Email Code</button>
      <button onClick={this.loginWithSocial.bind(this)} >Social</button>
      </div>
    );
  }
}


export default Login;
