import styled from "styled-components";
import { useGame } from "../hooks/useGame";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import "./Game.css";
import { Table, Divider, Space } from "antd";
import { useQuery } from "@apollo/client";
import { GAME_START } from "../graphql";
import { useLocation, useParams } from "react-router-dom";

const GameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url("https://i.imgur.com/FxoBtuQ.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`;

const CardType = {
  Back: { imagelink: "https://i.imgur.com/RhUNqco.png", type: 0, effect: 0 },
  Guard: { imagelink: "https://i.imgur.com/2v5Ynkv.png", type: 0, effect: 0 },
  Priest: { imagelink: "https://i.imgur.com/Bk7D8x9.png", type: 0, effect: 0 },
  Baron: { imagelink: "https://i.imgur.com/nwtLJ1R.png", type: 0, effect: 0 },
  Maid: { imagelink: "https://i.imgur.com/jCSv5V0.png", type: 0, effect: 0 },
  Prince: { imagelink: "https://i.imgur.com/NVYYfuz.png", type: 0, effect: 0 },
  King: { imagelink: "https://i.imgur.com/pXYghhT.png", type: 0, effect: 0 },
  Countess: {
    imagelink: "https://i.imgur.com/d8MPlrc.png",
    type: 0,
    effect: 0,
  },
  Princess: {
    imagelink: "https://i.imgur.com/3jAcQeb.png",
    type: 0,
    effect: 0,
  },
  Line: { imagelink: "https://i.imgur.com/Fugs1aQ.png", type: 0, effect: 0 },
};

const Card = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  border-radius: 5px;
`;

const Mycard = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  border-radius: 5px;
  height: 33vh;
  width: 11.5vw;
  top: 65%;
  &:hover {
    top: 62%;
    transition: 0.3s;
  }
`;
const Game = () => {
  const { me } = useGame();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myCard, setMyCard] = useState(false);
  const [clickPiles, setClickPiles] = useState(false);
  const [pilesNum, setPilesNum] = useState(12);
  const [selfInfo, setSelfInfo] = useState({});

  const { room } = useParams();
  const {
    data: Game,
    subscribeToMore: GameSubscribe,
    loading,
    error,
  } = useQuery(GAME_START, { variables: { name: me, roomName: room } });
  if (!loading) {
    // console.log(Game);
    // setSelfInfo(Game?.users?.filter(user=>{return user.name===me}))
  }

  useEffect(() => {
    if (clickPiles === true) {
      setPilesNum(pilesNum - 1);
    }
  }, [clickPiles]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMycard = () => {
    setMyCard(true);
  };

  const handlePiles = () => {
    setClickPiles(true);
    {
      Game.game.users.map((e) => (e.name === me ? {} : setSelfInfo(e)));
    }
  };

  const { gameStart } = useGame();
  return (
    <GameWrapper>
      <table
        style={{
          position: "absolute",
          width: "20vw",
          top: "2vh",
          left: "3vh",
        }}
      >
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Heart</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Maria</td>
            <td>❤️❤️❤️</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Chang</td>
            <td>❤️❤️❤️</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mendel</td>
            <td>❤️❤️</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Helen</td>
            <td>❤️</td>
          </tr>
        </tbody>
      </table>
      <Card
        style={{
          position: "absolute",
          height: "40vh",
          width: "13vw",
          top: "19vh",
          left: "51vw",
          content: `url(${CardType.Line.imagelink})`,
        }}
      />
      <Card
        onClick={handlePiles}
        style={{
          position: "absolute",
          height: "33vh",
          width: "11.5vw",
          top: "26vh",
          left: "37vw",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      {clickPiles ? (
        myCard ? (
          <>
            <Card
              style={{
                position: "absolute",
                height: "40vh",
                width: "13vw",
                top: "19vh",
                left: "51vw",
                content: `url(${CardType.Guard.imagelink})`,
              }}
            />
            <Mycard
              style={{
                left: "45%",
                content: `url(${CardType.Baron.imagelink})`,
              }}
            />
          </>
        ) : (
          <>
            <Mycard
              onClick={handleMycard}
              className="origin"
              style={{
                left: "37%",
                content: `url(${CardType.Guard.imagelink})`,
              }}
            />
            <Mycard
              onClick={handleMycard}
              className="move"
              style={{
                left: "51%",
                content: `url(${CardType.Baron.imagelink})`,
              }}
            />
          </>
        )
      ) : (
        <>
          <Mycard
            style={{ left: "44%", content: `url(${CardType.Baron.imagelink})` }}
          />
        </>
      )}
      <p
        style={{
          fontSize: "5vh",
          position: "absolute",
          top: "18vh",
          left: "40vw",
        }}
      >
        X {pilesNum}
      </p>
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "-8%",
          left: "46.5%",
          transform: "rotate(180deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "40.5%",
          left: "2%",
          transform: "rotate(90deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "40.5%",
          right: "2%",
          transform: "rotate(270deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <div
        onClick={handleOppoCard}
        className="oppo"
        style={{
          position: "absolute",
          height: "21vh",
          width: "34vw",
          top: "-8%",
          left: "33%",
        }}
      ></div>
      <div
        onClick={handleOppoCard}
        className="oppo"
        style={{
          position: "absolute",
          height: "36vh",
          width: "11vw",
          top: "33%",
          left: "0%",
        }}
      ></div>
      <div
        onClick={handleOppoCard}
        className="oppo"
        style={{
          position: "absolute",
          height: "36vh",
          width: "11vw",
          top: "33%",
          right: "0%",
        }}
      ></div>{" "}
      {/*
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "-8%",
          left: "51%",
          transform: "rotate(180deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "-8%",
          left: "42%",
          transform: "rotate(180deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "33%",
          left: "2%",
          transform: "rotate(90deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "48%",
          left: "2%",
          transform: "rotate(90deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "33%",
          right: "2%",
          transform: "rotate(270deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      <Card
        style={{
          position: "absolute",
          height: "20vh",
          width: "7vw",
          top: "48%",
          right: "2%",
          transform: "rotate(270deg)",
          content: `url(${CardType.Back.imagelink})`,
        }}
      />
      */}
      <Button
        size="large"
        shape="circle"
        type="primary"
        onClick={showModal}
        style={{
          position: "absolute",
          top: "90%",
          left: "72%",
          backgroundColor: "#a56031",
        }}
      >
        ?
      </Button>
      <Modal
        title="List of Cards"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{
          top: "4%",
          content: "url(https://i.imgur.com/1bDg2Be.jpg)",
          height: "95%",
          width: "25%",
        }}
      ></Modal>
    </GameWrapper>
  );
};

export default Game;
