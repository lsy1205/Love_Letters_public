import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { useGame } from "../hooks/useGame";

const { Title } = Typography;

const GuardModal = ({
  guardModalOpen,
  OpponentChosen,
  setGuardModalOpen,
  room,
  players,
}) => {
  const [guessType, setGuessType] = useState("???");
  const { me, action } = useGame();
  // console.log(OpponentChosen, room);

  const handleGuess = () => {
    if (guessType === "???") {
      // console.log("Choose a Type");
    } else {
      switch (guessType) {
        case "❷神父": {
          action({
            variables: {
              from: me,
              to: players[OpponentChosen].name,
              card: 1,
              roomName: room,
              cardTo: 2,
            },
          });

          // console.log("choose priest");
          break;
        }
        case "❸男爵": {
          // console.log("choose boran");
          action({
            variables: {
              from: me,
              to: players[OpponentChosen].name,
              card: 1,
              roomName: room,
              cardTo: 3,
            },
          });
          break;
        }
        case "❹侍女": {
          // console.log("choose maid");
          action({
            variables: {
              from: me,
              to: players[OpponentChosen].name,
              card: 1,
              roomName: room,
              cardTo: 4,
            },
          });
          break;
        }
        case "❺王子": {
          // console.log("choose prince");
          action({
            variables: {
              from: me,
              to: players[OpponentChosen].name,
              card: 1,
              roomName: room,
              cardTo: 5,
            },
          });
          break;
        }
        case "❻國王": {
          // console.log("choose king");
          action({
            variables: {
              from: me,
              to: players[OpponentChosen].name,
              card: 1,
              roomName: room,
              cardTo: 6,
            },
          });
          break;
        }
        case "❼公爵夫人": {
          // console.log("choose countess");
          action({
            variables: {
              from: me,
              to: players[OpponentChosen].name,
              card: 1,
              roomName: room,
              cardTo: 7,
            },
          });
          break;
        }
        case "❽公主": {
          // console.log("choose princess");
          action({
            variables: {
              from: me,
              to: players[OpponentChosen].name,
              card: 1,
              roomName: room,
              cardTo: 8,
            },
          });
          break;
        }
        default: {
          // console.log("System Error");
        }
      }
      setGuardModalOpen(false);
    }
  };
  return (
    <>
      <Modal
        centered={true}
        open={guardModalOpen}
        closable={false}
        mask={true}
        bodyStyle={{ backgroundColor: "white", borderRadius: "5px" }}
        footer={[<Button onClick={handleGuess}>Guess</Button>]}
      >
        <Title style={{ display: "flex", justifyContent: "center" }}>
          Guess Card Type
        </Title>
        <div style={{ height: "50vh", overflowY: "scroll" }}>
          {/* <Button
            onClick={() => {
              setGuessType("❶衛兵");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❶ 衛兵
          </Button> */}
          <Button
            onClick={() => {
              setGuessType("❷神父");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❷ 神父
          </Button>
          <Button
            onClick={() => {
              setGuessType("❸男爵");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❸ 男爵
          </Button>
          <Button
            onClick={() => {
              setGuessType("❹侍女");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❹ 侍女
          </Button>
          <Button
            onClick={() => {
              setGuessType("❺王子");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❺ 王子
          </Button>
          <Button
            onClick={() => {
              setGuessType("❻國王");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❻ 國王
          </Button>
          <Button
            onClick={() => {
              setGuessType("❼公爵夫人");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❼ 公爵夫人
          </Button>
          <Button
            onClick={() => {
              setGuessType("❽公主");
            }}
            type="text"
            size="large"
            style={{ width: "100%" }}
          >
            ❽ 公主
          </Button>
        </div>
        <Title
          level={3}
          style={{
            display: "flex",
            justifyContent: "center",
            // border: "1px solid",
          }}
        >
          Guess {"  " + guessType}
        </Title>
      </Modal>
    </>
  );
};

export default GuardModal;
