import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
    constructor(props) {
      super(props) 
      this.state = {
        count: 0,
        random: "a",
        winCondition: "Get to 25 points to WIN!",
        penalty: "Let's Go!",
        img: "http://opengameart.org/sites/default/files/cat_idle.gif"
      };
      this.handleIncrease = this.handleIncrease.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleRandom = this.handleRandom.bind(this);
    }

    handleRandom(event) {
        var charArr = ['a','s','d','f'];
        var randomChar = charArr[Math.floor(charArr.length * Math.random())];
        this.setState({
            random: randomChar
        })
        console.log('this is the random ', randomChar);
    }    

    handleIncrease(event) {

        event = event || window.event;
        var currCount = this.state.count;
        var charCode = event.keyCode || event.which;
        var charStr = String.fromCharCode(charCode);
        
        if(currCount === 25) {
          this.setState({
              winCondition: "YOU WIN!",
              img: "http://opengameart.org/sites/default/files/cat_a4.gif"
          })
        }
        else if(charStr === this.state.random) {     
          currCount += 1;
          this.setState({
              penalty: "You Rock!",
              img: "http://opengameart.org/sites/default/files/cat_a1.gif"
          })
        }
        else if(charStr !== this.state.random) {
          currCount -= 1;
          this.setState({
              penalty: "You Suck!",
              img: "http://opengameart.org/sites/default/files/cat_spin_kick.gif"
          })
        }
        this.setState({
            count: currCount
        });
        this.handleRandom();

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
            <h4>{this.state.random}</h4>
            <h5>{this.state.winCondition}</h5>
            <h5>{this.state.penalty}</h5>
            <img src={this.state.img}/>
            <div onKeyPress={this.handleIncrease}>{this.state.count}</div>
            <button onClick={this.handleIncrease}>+</button>
            </div> 
            <button onClick={this.handleReset}>RESET</button>
        </div>
        )
    }
}

export default Button;