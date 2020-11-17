import React, { Component } from "react";
import "./InputRange.css";

class InputRange extends Component {
  inputLeft = React.createRef();
  inputRight = React.createRef();

  thumbLeft = React.createRef();
  thumbRight = React.createRef();
  range = React.createRef();

  state = {
    inputLeftValue: this.props.min,
    inputRightValue: this.props.max,
  };

  changeInputLeft = () => {
    console.log("inputLeft");

    let min = parseInt(this.inputLeft.current.min);
    let max = parseInt(this.inputLeft.current.max);

    let inputLeftValue = Math.min(
      parseInt(this.inputLeft.current.value),
      parseInt(this.inputRight.current.value) - 1
    );

    this.setState({ inputLeftValue });

    let percent = ((inputLeftValue - min) / (max - min)) * 100;

    this.thumbLeft.current.style.left = percent + "%";
    this.range.current.style.left = percent + "%";
  };

  changeInputRight = () => {
    console.log("inputRight");
    let min = parseInt(this.inputRight.current.min);
    let max = parseInt(this.inputRight.current.max);

    let inputRightValue = Math.max(
      parseInt(this.inputRight.current.value),
      parseInt(this.inputLeft.current.value) + 1
    );

    this.setState({ inputRightValue });

    let percent = ((inputRightValue - min) / (max - min)) * 100;

    this.thumbRight.current.style.right = 100 - percent + "%";
    this.range.current.style.right = 100 - percent + "%";
  };

  render() {
    console.log(this.props, "this.props InputRange");
    return (
      <div className="middle">
        <div className="multi-range-slider">
          <input
            onInput={this.changeInputLeft}
            type="range"
            ref={this.inputLeft}
            min={this.props.min}
            max={this.props.max}
            value={this.state.inputLeftValue}
            name="rangeLeft"
          />
          <input
            onInput={this.changeInputRight}
            type="range"
            ref={this.inputRight}
            min={this.props.min}
            max={this.props.max}
            value={this.state.inputRightValue}
            name="rangeRight"
          />

          <div className="slider">
            <div className="track"></div>
            <div ref={this.range} className="range"></div>
            <div ref={this.thumbLeft} className="thumb left"></div>
            <div ref={this.thumbRight} className="thumb right"></div>
          </div>

          <div className="output">
            <output>{this.state.inputLeftValue}</output>
            <output>{this.state.inputRightValue}</output>
          </div>

        </div>
      </div>
    );
  }
}

export default InputRange;
