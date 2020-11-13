import React, { Component, PureComponent } from "react";
import "./styles.css";

const stylesElements = {
  0: "cell",
  1: "one",
  2: "two",
  3: "tree"
};

export default class Cell extends Component {
  onClick = () => {
    const { onClickCell, cellIndex } = this.props;

    onClickCell(cellIndex);
  };

  render() {
    const { element } = this.props;

    return (
      <div
        className={`cell ${stylesElements[element]}`}
        onClick={this.onClick}
      />
    );
  }
}
