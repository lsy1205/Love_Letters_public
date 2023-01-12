import { useEffect, useState } from "react";
import styled from "styled-components";
import "./InGameLeaderBoard.css";

const InGameLeaderBoard = ({ Game }) => {
  // console.log(Game);
  const [rankedPlayer, setRankedPlayer] = useState([]);
  return (
    <table className="leaderboard">
      <tbody>
        <tr>
          <th>Player</th>
          <th>Name</th>
          <th>Turn</th>
        </tr>
        <tr>
          <td>1</td>
          <td>{Game.game.users[0].name}</td>
          <td>
            {Game.game.turn === Game.game.users[0].name
              ? "❤️"
              : Game.game.users[0].out
              ? "Out"
              : ""}
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>{Game.game.users[1].name}</td>
          <td>
            {Game.game.turn === Game.game.users[1].name
              ? "❤️"
              : Game.game.users[1].out
              ? "Out"
              : ""}
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>{Game.game.users[2].name}</td>
          <td>
            {Game.game.turn === Game.game.users[2].name
              ? "❤️"
              : Game.game.users[2].out
              ? "Out"
              : ""}
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>{Game.game.users[3].name}</td>
          <td>
            {Game.game.turn === Game.game.users[3].name
              ? "❤️"
              : Game.game.users[3].out
              ? "Out"
              : ""}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default InGameLeaderBoard;
