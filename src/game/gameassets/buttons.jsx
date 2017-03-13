import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
    constructor(props) {
      super(props) 
      this.state = {
        count: 0
      };
      this.handleIncrease = this.handleIncrease.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }


        
    handleIncrease(event) {
        var charArr = ['a','s','d','f'];
        var randomChar = charArr[Math.floor(charArr.length * Math.random())];
        console.log('this is the randomChar', randomChar);

        event = event || window.event;
        var currCount = this.state.count;
        var charCode = event.keyCode || event.which;
        var charStr = String.fromCharCode(charCode);

        if(charStr === randomChar) {     
          currCount += 1;
        }
        else {
          currCount -= 1;
        }

        this.setState({
            count: currCount
        });
    }

    handleReset() {
        var maxCount = this.state.count;
            maxCount = 0;
        this.setState({
            count: maxCount
        });
    }

    render() {
        return(
        <div>
            <div onKeyPress={this.handleIncrease}>
            <div onKeyPress={this.handleIncrease}>{this.state.count}</div>
            <button onClick={this.handleIncrease}>+</button>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default Button;