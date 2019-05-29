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
      return [squares[a], [a, b, c]];
    }
  }
  return [null, null];
};
const getChange = (list1, list2) => {
  for (let i = 0; i < list2.length + 1; i++) {
    if (list1[i] !== list2[i]) {
      return i;
    }
  }
  return null;
};
const toColRow = i => {
  let col = 0;
  if (0 <= i && i <= 2) {
    col = 0;
  } else if (3 <= i && i <= 5) {
    col = 1;
    i -= 2;
  } else {
    col = 2;
    i -= 5;
  }
  return [col, i];
};
const Square = props => {
  return (
    <button className={props.classes} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends Component {
  renderSquare(i, winner) {
    return (
      <Square
        classes={winner ? "square highlight" : "square"}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    const col = [0, 1, 2];
    const row = [0, 3, 6];
    const board = row.map(rowIndex => {
      return (
        <div className="boardRow">
          {col.map(colIndex => {
            let flag = false;
            if (this.props.winner) {
              flag = this.props.winner.indexOf(colIndex + rowIndex) > -1;
            }
            return this.renderSquare(colIndex + rowIndex, flag);
          })}
        </div>
      );
    });
    return <div>{board}</div>;
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
    stepNumber: 0,
    btnSelected: 0,
    reverse: false
  };
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (checkWinner(squares)[0] || squares[i]) return;
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
      xIsNext: step % 2 === 0,
      btnSelected: step
    });
  }
  toggleOrder() {
    this.setState({
      reverse: !this.state.reverse
    });
  }
  restartGame() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      btnSelected: 0,
      reverse: false
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkWinner(current.squares);
    let moves = history.map((step, move) => {
      const lastMove = move
        ? getChange(history[move - 1].squares, history[move].squares)
        : null;
      const coord = toColRow(lastMove);
      const desc = move
        ? "Jump to move #" + move + " (" + coord + ")"
        : "Jump to game start #0";
      return (
        <li key={move}>
          <button
            className={this.state.btnSelected === move ? "selected" : null}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    if (this.state.reverse) {
      moves = moves.reverse();
    }
    let status = null;
    if (winner[0] !== null) {
      status = "Winner is: " + winner[0];
    } else {
      if (this.state.stepNumber < 9) {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      } else {
        status = "Draw!";
      }
    }
    return (
      <div className="game">
        <nav className="nav">
          <button className="orderbtn" onClick={() => this.toggleOrder()}>
            Change order
          </button>
          <div className="history" onClick={() => alert("gay")}>
            History
          </div>
        </nav>
        <div className="gameInfo">
          <div>{status}</div>
        </div>
        <div className="gameBoard">
          <Board
            squares={current.squares}
            winner={winner[1]}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <footer className="footer">
          <div className="restartBtn" onClick={() => this.restartGame()}>
            Restart
          </div>
        </footer>
      </div>
    );
  }
}

export default Game;
