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
      this.handleChanges = this.handleChanges.bind(this);
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

// const keyCodes = {
//   3 : "break",
//   8 : "backspace / delete",
//   9 : "tab",
//   12 : 'clear',
//   13 : "enter",
//   16 : "shift",
//   17 : "ctrl",
//   18 : "alt",
//   19 : "pause/break",
//   20 : "caps lock",
//   27 : "escape",
//   32 : "spacebar",
//   33 : "page up",
//   34 : "page down",
//   35 : "end",
//   36 : "home ",
//   37 : "left arrow ",
//   38 : "up arrow ",
//   39 : "right arrow",
//   40 : "down arrow ",
//   41 : "select",
//   42 : "print",
//   43 : "execute",
//   44 : "Print Screen",
//   45 : "insert ",
//   46 : "delete",
//   48 : "0",
//   49 : "1",
//   50 : "2",
//   51 : "3",
//   52 : "4",
//   53 : "5",
//   54 : "6",
//   55 : "7",
//   56 : "8",
//   57 : "9",
//   58 : ":",
//   59 : "semicolon (firefox), equals",
//   60 : "<",
//   61 : "equals (firefox)",
//   63 : "ß",
//   64 : "@ (firefox)",
//   65 : "a",
//   66 : "b",
//   67 : "c",
//   68 : "d",
//   69 : "e",
//   70 : "f",
//   71 : "g",
//   72 : "h",
//   73 : "i",
//   74 : "j",
//   75 : "k",
//   76 : "l",
//   77 : "m",
//   78 : "n",
//   79 : "o",
//   80 : "p",
//   81 : "q",
//   82 : "r",
//   83 : "s",
//   84 : "t",
//   85 : "u",
//   86 : "v",
//   87 : "w",
//   88 : "x",
//   89 : "y",
//   90 : "z"
// };

    handleIncrease(event) {
        var currCount = this.state.count;
        if(event.keyCode === "a" && currCount >= 10) { 
            currCount += 10;
        }
        else if(event.altKey && currCount >= 50) {
            currCount += 20;
        }
        else if(event.shiftKey && currCount >= 300) {
            currCount = 0;
        }
        else if(currCount >= 100) {
            currCount = 0;
        }
        else {
            console.log("asdf", event.keyCode)
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
            <div onKeyPress={this.handleIncrease}>
            <div onClick={this.handleIncrease}>{this.state.count}</div>
            <button onClick={this.handleIncrease}>+</button>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default Button;