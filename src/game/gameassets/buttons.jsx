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

// randomize keys and check if conditions meet to increment; if not decrement count
handleChanges(event) {
    var arr = ['a','s','d','f'];

    var count = 0;

    function handleInput(arr, event) {
    var result = arr[Math.floor(arr.length * Math.random())];
        if(result === input) {
        count += 1
        } else {
        count -= 1
        }
    return count
    }
}


    handleIncrease(event) {
        var currCount = this.state.count;
        if(event.shiftKey && currCount >= 10) { 
            currCount += 10;
        }
        else if(event.ctrlKey && currCount >= 20) {
            currCount += 20;
        }
        else if(event.shiftKey && currCount >= 100) {
            currCount = 0;
        }
        else if(currCount >= 100) {
            currCount = 0;
        }
        else {
            currCount += 1;
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
            <div onClick={this.handleIncrease}>
            <div onClick={this.handleIncrease}>{this.state.count}</div>
            <button onClick={this.handleIncrease}>+</button>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default Button;