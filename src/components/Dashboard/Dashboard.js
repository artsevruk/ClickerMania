import React, { PureComponent } from "react";
import Cell from "../Cell";
import { matrix } from "../../helpers/matrix";
import "./styles.css";

export default class Dashboard extends PureComponent {
  state = {
    matrix: matrix,
    cellIndex: []
  };

  onClickCell = (index) => {
    matrix.click(index);

    this.setState({
      matrix: matrix,
      cellIndex: index
    });
  };

  render() {
    return (
      <div className="dashboard">
        {this.state.matrix.getArea().map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((element, columnIndex) => {
                return (
                  <Cell
                    element={element}
                    cellIndex={[rowIndex, columnIndex]}
                    onClickCell={this.onClickCell}
                    key={columnIndex}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
