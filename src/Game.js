import React, { Component } from "react";
const checkWinner = squares => {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
const Square = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends Component {
  state = { squares: Array(9).fill(null), xIsNext: true };
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (checkWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    const winner = checkWinner(this.state.squares);
    let status =
      winner !== null
        ? "Winner is: " + winner
        : "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div>
        <div className="status">{status}</div>
        <div className="boardRow">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="boardRow">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="boardRow">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="gameBoard">
          <Board />
        </div>
        <div className="gameInfo">
          <div>{status}</div>
          <ol />
        </div>
      </div>
    );
  }
}

export default Game;
