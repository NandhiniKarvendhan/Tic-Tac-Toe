const Square = ({ takeTurn, id, status }) => {
  const mark = ["O", "X", "+"];
  // id is the square's number
  // filled tells us if square has been filled
  // tik tells us symbol in square (same as player)
  // We call takeTurn to tell Parent we have filled the square
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);
  const [disable, setDisable] = React.useState(false);

  return (
    <button
      className={tik == "1" ? "red" : "white"}
      onClick={() => {
        setTik(takeTurn(id));
        setFilled(true);
        setDisable(true);
        console.log(`Square: ${id} filled by player : ${tik}`);
      }}
      disabled={disable}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  // check for winner (see superset.js)
  let status = `${checkForWinner(gameState)}`;
  // console.log(`We hava a winner ${status}`);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i} status={status}></Square>;
  }
  function playerName(player) {
    if (player == 1) {
      return "Player X";
    } else {
      return "Player O";
    }
  }
  function disableBtn(status) {
    if (status != "")
      document.getElementById("gameArea").classList.add("disablebutton");
  }
  return (
    <div className="game-board">
      <div id="gameArea">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div id="info">
        <h1 id="turn">Next Player: {playerName(player)}</h1>
        <h1>
          {status}
          {disableBtn(status)}
        </h1>
        <h1>
          <button
            className="restart-btn"
            onClick={() => {
              window.location.reload();
            }}
          >
            Restart
          </button>
        </h1>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
