import React from 'react';
import Navbar from './Navbar.jsx';

//this component renders navbar and all the other routes to the other components
//children comes from browser history
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
