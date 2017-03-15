import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

this.AUTH0_CLIENT_ID = 'prZdyhStrcE55F4qE5C6V0WK7FiovNoo';
this.AUTH0_DOMAIN = 'yangemilym.auth0.com';
this.AUTH0_CALLBACKURL = 'http://localhost:8000/#/tree';
  }

  loginWithSMS() {
    const lock = new Auth0LockPasswordless(this.AUTH0_CLIENT_ID, this.AUTH0_DOMAIN);
    lock.sms({
      responseType: 'token',
      callbackURL: this.AUTH0_CALLBACKURL,
    });
  }

loginWithEmailCode() {
	const lock = new Auth0LockPasswordless(this.AUTH0_CLIENT_ID, this.AUTH0_DOMAIN);
	// 	lock.emailcode({
	// 	responseType:'token', 
	// 	callbackURL: this.AUTH0_CALLBACKURL
    // });
lock.emailcode(function(err, profile, id_token, state){
    if(!err){
        localStorage.setItem('userToken', id_token);
        //send a redux action that sets state.auth.authenticated to true
        // state.auth.user to profile
    }
});

    // lock.on('authenticated', function(){
    //     console.log('authenticated')
    // });
	}


loginWithEmailLink(){
	const lock = new Auth0LockPasswordless(this.AUTH0_CLIENT_ID, this.AUTH0_DOMAIN);
		    lock.magiclink({
		      responseType: 'token',
		      callbackURL: this.AUTH0_CALLBACKURL
		    })
		  }

loginWithSocialOrSms(){
	const lock = new Auth0LockPasswordless(this.AUTH0_CLIENT_ID, this.AUTH0_DOMAIN);
      		lock.socialOrSms({
  			  connections: ["facebook", "twitter"],
  			  responseType: 'token',
  			  callbackURL : this.AUTH0_CALLBACKURL
			});
		  }


  render() {
    return (
      <div> 
      <button onClick={this.loginWithSMS.bind(this)}>SMS</button>
      <button onClick={this.loginWithEmailCode.bind(this)}>Email Code</button>
      <button onClick={this.loginWithEmailLink.bind(this)}>Email Link</button>
      <button onClick={this.loginWithSocialOrSms.bind(this)} >Social or SMS</button>
      </div>
    );
  }
}


export default Login;
