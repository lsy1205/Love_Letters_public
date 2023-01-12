import styled from "styled-components";
import { useGame } from "../hooks/useGame";
import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import "./Game.css";
import { Table, Divider, Space } from "antd";
import { useQuery } from "@apollo/client";
import { GAME_START, GAME_SUBSCRIPTION } from "../graphql";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InGameLeaderBoard from "../components/InGameLeaderBoard";
import CardListModal from "../components/CardListModal";
import GuardModal from "../components/GuardModal";
import YourTurn from "../components/YourTurn";
import GameConsole from "./GameConsole";
import deepClone from "../utils/DeepClone";
import GameUser from "../components/GameUser";
import Player from "../components/Player";
import BGM from "../components/BGM.mp3";
import RoundEnd from "../components/RoundEnd";

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

const CardType = [
  { type: "Back", imageLink: "https://i.imgur.com/RhUNqco.png", number: 0 },
  { type: "Guard", imageLink: "https://i.imgur.com/2v5Ynkv.png", number: 1 },
  { type: "Priest", imageLink: "https://i.imgur.com/Bk7D8x9.png", number: 2 },
  { type: "Baron", imageLink: "https://i.imgur.com/nwtLJ1R.png", number: 3 },
  { type: "Maid", imageLink: "https://i.imgur.com/jCSv5V0.png", number: 4 },
  { type: "Prince", imageLink: "https://i.imgur.com/NVYYfuz.png", number: 5 },
  { type: "King", imageLink: "https://i.imgur.com/pXYghhT.png", number: 6 },
  { type: "Countess", imageLink: "https://i.imgur.com/d8MPlrc.png", number: 7 },
  { type: "Princess", imageLink: "https://i.imgur.com/3jAcQeb.png", number: 8 },
];

// Opponent Cards
const Card = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  border-radius: 5px;
`;

const Player1CardWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  height: 36vh;
  width: 13vw;
  left: 0vw;
  top: 33vh;
`;

const Player1Card = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: 5px;
  height: 20vh;
  width: 7vw;
  left: -1vw;
  transform: rotate(90deg);
  content: url(${CardType[0].imageLink});
`;

const Player2CardWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 15vh;
  width: 20vw;
  top: 0;
`;
const Player2Card = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: 5px;
  height: 20vh;
  width: 7vw;
  transform: rotate(180deg);
  content: url(${CardType[0].imageLink});
`;

const Player3CardWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  height: 36vh;
  width: 13vw;
  right: 0vw;
  top: 33vh;
  overflow: hidden;
`;
const Player3Card = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: 5px;
  height: 20vh;
  width: 7vw;
  right: -7vw;
  overflow: hidden;
  transform: rotate(270deg);
  content: url(${CardType[0].imageLink});
`;

const Sheild = styled.div`
  height: 8vh;
  width: 8vh;
  position: absolute;
  z-index: 999;
`;
// MyCard
const Mycard = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: 5px;
  height: 33vh;
  width: 11.5vw;
  top: 0vh;
  &:hover {
    top: -3vh;
    transition: 0.3s;
    cursor: pointer;
  }
`;

const MyCardWrapper = styled.div`
  position: absolute;
  height: 37.5vh;
  width: 30vw;
  ${"" /* border: 1px solid; */}
  display: flex;
  top: 62.5vh;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const RightCard = styled.div``;
const LeftCard = styled.div``;
const UseCard = styled.div``;
const MiddleCard = styled.div``;

// Middle Pile and Used Cards
const UsedCardFrame = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: 5px;
  position: absolute;
  height: 40vh;
  width: 13vw;
  top: 19vh;
  left: 51vw;
  content: url(https://i.imgur.com/Fugs1aQ.png);
`;

const Pile = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  border-radius: 5px;
  position: absolute;
  height: 33vh;
  width: 11.5vw;
  top: 26vh;
  left: 37vw;
  content: url(${CardType[0].imageLink});
`;

const UsedCard = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  border-radius: 5px;
  height: 40vh;
  width: 13vw;
  top: 19vh;
  left: 51vw;
`;

// Footer

const Game = () => {
  const navigate = useNavigate();
  const { me, gameStart, action, setGameStart } = useGame();
  const [players, setPlayers] = useState([]);
  const [myNumber, setMyNumber] = useState(0);
  const [UsingCard, setUsingCard] = useState(0);
  const [OpponentChosen, setOpponentChosen] = useState(0);
  const [yourTurn, setYourTurn] = useState(false);
  const [battleMsg, setBattleMsg] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  // let OpponentChosen = 0;
  // Card Effect Modals
  const [guardModalOpen, setGuardModalOpen] = useState(false);

  const [canChooseOppo, setCanChooseOppo] = useState([true, true, true]);

  // Round End modal
  const [roundEnd, setRoundEnd] = useState(false);

  // Move Card
  const [moveMyCard, setMoveMyCard] = useState(false);
  // Draw Card
  const [drawCard, setDrawCard] = useState(false);
  const [pilesNum, setPilesNum] = useState(12);
  const [myInfo, setMyInfo] = useState();
  const { room } = useParams();
  const [usedCard, setUsedCard] = useState(0);
  const [chooseOppo, setChooseOppo] = useState(false);
  const [chooseMe, setChooseMe] = useState(false);
  let log = false;
  // if (gameStart) {
  //   messageApi.open({
  //     type: "success",
  //     content: "Game Start",
  //   });
  //   setGameStart(false);
  // }
  if (gameStart) {
    window.location.reload();
    setGameStart(false);
  }

  // Use Card
  const [use, setUse] = useState(false);
  const {
    data: Game,
    subscribeToMore: GameSubscribe,
    loading,
    error,
  } = useQuery(GAME_START, { variables: { name: me, roomName: room } });

  useEffect(() => {
    try {
      GameSubscribe({
        document: GAME_SUBSCRIPTION,
        variables: { name: me, roomName: room },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const Game = subscriptionData.data;
          //  console.log(Game);
          if (Game.game.end) {
            // console.log("呱呱");
            setRoundEnd(true);
            return Game;
          }
          return Game;
        },
      });
    } catch (e) {
      // console.log("Error in subscription:", e);
    }
  }, [GameSubscribe, me, room]);

  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!loading) {
      // console.log(Game);
      // find self index
      setMyNumber(
        Game.game.users.findIndex((user) => {
          return user.name === me;
        })
      );
      setPilesNum(Game.game.cardLeft);
    }
  }, [Game, loading, me]);
  useEffect(() => {
    if (!loading) {
      if (Game.game.users[myNumber].name === me) {
        setPlayers([
          Game.game.users[(myNumber + 1) % 4],
          Game.game.users[(myNumber + 2) % 4],
          Game.game.users[(myNumber + 3) % 4],
        ]);
        setMyInfo(Game.game.users[myNumber]);
        setYourTurn(me === Game.game.turn);
      }
    }
  }, [myNumber, loading, Game]);
  useEffect(() => {
    if (!loading) {
      if (Game.game.users[myNumber].name === me) {
        setCanChooseOppo([
          !players[0]?.protected && !players[0]?.out,
          !players[1]?.protected && !players[1]?.out,
          !players[2]?.protected && !players[2]?.out,
        ]);
      }
    }
    // console.log(players);
    // console.log(myInfo);
  }, [players]);

  useEffect(() => {
    if (!loading) {
      setBattleMsg((prev) => {
        return [...prev, Game.game.log];
      });
      if (Game.game.cardUsed) {
        setUsedCard(Game.game.cardUsed);
      }
    }
  }, [Game]);
  ////////////////////////////////////////////////////////////////

  const handleDraw = () => {
    setDrawCard(true);
    // setMyCard((prev) => {
    //   return [...prev, CardType[8]];
    // });
  };

  const handleOppoCard = async (choose) => {
    setChooseOppo(false);
    // console.log(choose);
    // // console.log(UsingCard);

    if (UsingCard === 1) {
      setOpponentChosen(choose);
      // console.log("open guard modal");
      setGuardModalOpen(true);
      // setUsedCard(1);
    } else {
      setChooseMe(false);
      log = await action({
        variables: {
          from: me,
          to: players[choose].name,
          card: UsingCard,
          roomName: room,
        },
      });
      // console.log(log);
    }
  };

  const handleUse = async (card, index) => {
    if (Game.game.turn !== me) {
      // console.log("Not Your Turn");
      return;
    }
    setUse(true);
    setDrawCard(false);

    switch (card) {
      case 1: {
        // console.log("use gurad");
        if (
          (players[0].protected || players[0].out) &&
          (players[1].protected || players[1].out) &&
          (players[2].protected || players[2].out)
        ) {
          messageApi.open({
            duration: "2",
            type: "warning",
            content: "使用衛兵但是沒人可以選 可悲",
          });
          log = await action({
            variables: {
              from: me,
              to: null,
              card: 1,
              roomName: room,
              cadTo: null,
            },
          });
          // console.log(log);
          setChooseOppo(false);
          break;
        }
        setChooseOppo(true);
        setUsingCard(1);

        break;
      }
      case 2: {
        // console.log("use Priest");
        if (
          (players[0].protected || players[0].out) &&
          (players[1].protected || players[1].out) &&
          (players[2].protected || players[2].out)
        ) {
          messageApi.open({
            duration: "2",
            type: "warning",
            content: "使用神父但是沒人可以選 可悲",
          });
          log = await action({
            variables: {
              from: me,
              to: null,
              card: 2,
              roomName: room,
              cadTo: null,
            },
          });
          // console.log(log);
          setChooseOppo(false);
          break;
        }
        setChooseOppo(true);
        setUsingCard(2);
        // setUsedCard(2);
        break;
      }
      case 3: {
        // console.log("use Baron");
        if (
          (players[0].protected || players[0].out) &&
          (players[1].protected || players[1].out) &&
          (players[2].protected || players[2].out)
        ) {
          messageApi.open({
            duration: "2",
            type: "warning",
            content: "使用男爵但是沒人可以選 可悲",
          });
          log = await action({
            variables: {
              from: me,
              to: null,
              card: 3,
              roomName: room,
              cadTo: null,
            },
          });
          // console.log(log);
          setChooseOppo(false);
          break;
        }
        setChooseOppo(true);
        setUsingCard(3);
        // setUsedCard(3);
        break;
      }
      case 4: {
        // console.log("use maid");
        setUsingCard(4);
        // setUsedCard(4);
        setChooseOppo(false);
        log = await action({
          variables: {
            from: me,
            to: null,
            card: 4,
            roomName: room,
          },
        });
        // console.log(log);
        break;
      }
      case 5: {
        if (
          myInfo.card.find((c) => {
            return c === 7;
          })
        ) {
          // console.log("You need to use countess");
          messageApi.open({
            duration: "2",
            type: "error",
            content: "你必須打公爵夫人 滾去看說明書",
          });
          setChooseOppo(false);
          break;
        }

        // console.log("use Prince");
        setChooseOppo(true);
        setUsingCard(5);
        // setUsedCard(5);
        setChooseMe(true);
        break;
      }
      case 6: {
        if (
          myInfo.card.find((c) => {
            return c === 7;
          })
        ) {
          // console.log("You need to use countess");
          messageApi.open({
            duration: "2",
            type: "error",
            content: "你必須打公爵夫人 滾去看說明書",
          });
          setChooseOppo(false);
          break;
        }
        if (
          (players[0].protected || players[0].out) &&
          (players[1].protected || players[1].out) &&
          (players[2].protected || players[2].out)
        ) {
          messageApi.open({
            duration: "2",
            type: "warning",
            content: "使用國王但是沒人可以選 可悲",
          });
          log = await action({
            variables: {
              from: me,
              to: null,
              card: 6,
              roomName: room,
              cadTo: null,
            },
          });
          // console.log(log);
          break;
        }
        // console.log("use King");
        setChooseOppo(true);
        setUsingCard(6);
        // setUsedCard(6);
        break;
      }
      case 7: {
        // console.log("use Countess");
        log = await action({
          variables: { from: me, to: null, card: card, roomName: room },
        });
        // console.log(log);
        setUsingCard(7);
        setChooseOppo(false);
        // setUsedCard(7);
        break;
      }
      case 8: {
        // console.log("use princess");
        setUsingCard(8);
        log = await action({
          variables: { from: me, to: null, card: card, roomName: room },
        });
        // console.log(log);
        setChooseOppo(false);
        // setUsedCard(8);
        break;
      }
      default: {
        // console.log("ERROR");
        break;
      }
    }
  };

  useEffect(() => {
    // // console.log(usedCard);
  }, [usedCard]);

  //
  return loading ? (
    <GameWrapper>loading</GameWrapper>
  ) : (
    <GameWrapper>
      {players.length === 0 ? <></> : <GameUser players={players}></GameUser>}

      {contextHolder}
      <GameConsole messages={battleMsg} />
      <InGameLeaderBoard Game={Game} />
      <UsedCardFrame />
      <Pile onClick={handleDraw} />
      <UsedCard style={{ content: `url(${CardType[usedCard].imageLink})` }} />
      <MyCardWrapper>
        {myInfo ? (
          <>
            {myInfo.card.map((card, index) => {
              return (
                <Mycard
                  onClick={() => {
                    handleUse(card, index);
                  }}
                  key={index}
                  style={{
                    zIndex: "1",
                    content: `url(${CardType[card].imageLink}) `,
                  }}
                />
              );
            })}
          </>
        ) : (
          ""
        )}
      </MyCardWrapper>
      <CardListModal />
      <RoundEnd open={roundEnd} Game={Game} />
      <GuardModal
        guardModalOpen={guardModalOpen}
        OpponentChosen={OpponentChosen}
        setGuardModalOpen={setGuardModalOpen}
        room={room}
        players={players}
      />
      {chooseOppo ? (
        <>
          {canChooseOppo[0] ? (
            <div
              onClick={() => {
                // setOpponentChosen(0);
                // OpponentChosen = 0;
                handleOppoCard(0);
              }}
              className="oppo"
              style={{
                position: "absolute",
                height: "36vh",
                width: "11vw",
                top: "33%",
                left: "0%",
              }}
            />
          ) : (
            ""
          )}
          {canChooseOppo[1] ? (
            <div
              onClick={() => {
                // setOpponentChosen(1);
                // OpponentChosen = 1;
                handleOppoCard(1);
              }}
              className="oppo"
              style={{
                position: "absolute",
                height: "21vh",
                width: "34vw",
                top: "-8%",
                left: "33%",
              }}
            />
          ) : (
            ""
          )}
          {canChooseOppo[2] ? (
            <div
              onClick={() => {
                // setOpponentChosen(2);
                // OpponentChosen = 2;
                handleOppoCard(2);
              }}
              className="oppo"
              style={{
                position: "absolute",
                height: "36vh",
                width: "11vw",
                top: "33%",
                right: "0%",
              }}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      {chooseMe ? (
        <div
          className="myself"
          onClick={async () => {
            setChooseMe(false);
            setChooseOppo(false);
            log = await action({
              variables: {
                from: me,
                to: me,
                card: 5,
                roomName: room,
              },
            });
            // console.log(log);
          }}
        />
      ) : (
        ""
      )}
      {pilesNum ? (
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
      ) : (
        <p
          style={{
            fontSize: "5vh",
            position: "absolute",
            top: "18vh",
            left: "40vw",
          }}
        >
          X 0
        </p>
      )}
      {yourTurn ? <YourTurn /> : ""}
      <Player url={BGM} />
      {!players[0]?.out ? (
        <Player1CardWrapper>
          <Player1Card style={{ zIndex: 1 }} />
          {players[0]?.name === Game.game.turn ? (
            <Player1Card style={{ zIndex: 1 }} />
          ) : players[0]?.protected ? (
            <Sheild
              style={{
                top: "25vh",
                left: "9vw",
                content: "url(https://i.imgur.com/IGdexgg.png)",
              }}
            />
          ) : (
            ""
          )}
        </Player1CardWrapper>
      ) : (
        ""
      )}
      {!players[1]?.out ? (
        <Player2CardWrapper>
          <Player2Card style={{ zIndex: 1 }} />
          {players[1]?.name === Game.game.turn ? (
            <Player2Card style={{ zIndex: 1 }} />
          ) : players[1]?.protected ? (
            <Sheild
              style={{
                top: "5vh",
                left: "20vw",
                content: "url(https://i.imgur.com/IGdexgg.png)",
              }}
            />
          ) : (
            ""
          )}
        </Player2CardWrapper>
      ) : (
        ""
      )}
      {!players[2]?.out ? (
        <Player3CardWrapper>
          <Player3Card style={{ zIndex: 1 }} />
          {players[2]?.name === Game.game.turn ? (
            <Player3Card style={{ zIndex: 1 }} />
          ) : players[2]?.protected ? (
            <Sheild
              style={{
                top: "25vh",
                right: "9vw",
                content: "url(https://i.imgur.com/IGdexgg.png)",
              }}
            />
          ) : (
            ""
          )}
        </Player3CardWrapper>
      ) : (
        ""
      )}
    </GameWrapper>
  );
};

export default Game;
