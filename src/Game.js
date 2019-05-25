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
const getChange = (list1, list2) => {
  console.log(list1);
  console.log(list2);
  for (let i = 0; i < list2.length + 1; i++) {
    if (list1[i] !== list2[i]) {
      console.log(i);
      return i;
    }
  }
  return null;
};
const toColRow = i => {
  let col = 0;
  let row = 0;
  if (0 <= i && i <= 2) {
    col = 1;
  } else if (3 <= i && i <= 5) {
    col = 2;
  } else {
    col = 3;
  }
  row = col === 1 ? i + col : i - col;
  return [col, row];
};
const Square = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
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
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true,
    stepNumber: 0
  };
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (checkWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkWinner(current.squares);
    const moves = history.map((step, move) => {
      const lastMove = move
        ? getChange(history[move - 1].squares, history[move].squares)
        : null;
      const coord = toColRow(lastMove);
      const desc = move
        ? "Jump to move #" + move + "(" + coord + ")"
        : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status =
      winner !== null
        ? "Winner is: " + winner
        : "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        <div className="gameBoard">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="gameInfo">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
