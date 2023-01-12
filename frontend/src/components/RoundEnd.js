import React, { useState } from "react";
import { Button, Divider, Modal, Typography } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const { Text, Title } = Typography;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Dancing Script";
`;
const WinnerWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const StatusWrapper = styled.div``;
const Place = styled.div`
  font-size: 3vh;
  width: 5vw;
`;
const Person = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  font-size: 3vh;
  width: 60vw;
`;
const Name = styled(Text)`
  width: 20%;
`;

const RoundEnd = ({ open, Game }) => {
  const navigate = useNavigate();
  const { room } = useParams();

  // const [isModalOpen, setIsModalOpen] = useState(open);
  // let Game = [1, 2, 3, 4];

  const handleBack = () => {
    navigate(`/room/${room}`);
  };

  // let round = 1;
  let title = "Result";
  // console.log(Game);
  return (
    <>
      <Modal
        centered={true}
        title={
          <TitleWrapper>
            <Title level={2}>{title}</Title>
          </TitleWrapper>
        }
        open={open}
        closable={false}
        mask={true}
        footer={[
          <Button key="Return" danger onClick={handleBack}>
            Back to Room {`${room}`}
          </Button>,
        ]}
      >
        <Divider plain>Winner</Divider>
        <WinnerWrapper>
          {Game.game.winner
            ? Game.game.winner.map((win, index) => {
                return (
                  <Person key={`winner${index}`}>
                    <Place key={`place${index}`}>🏆</Place>
                    <Text key={`name${index}`} strong>
                      {win}
                    </Text>
                  </Person>
                );
              })
            : ""}
        </WinnerWrapper>
        <Divider plain>Status</Divider>
        <StatusWrapper>
          {Game.game.users.map((user, index) => {
            return (
              <Person key={`person${index}`}>
                <Place key={`statatusIcon${index}`}>👤</Place>
                <Name key={`statusName${index}`} strong>
                  {user.name}
                </Name>
                {user.card.length !== 0 ? (
                  <Text key={`cardLeft${index}`}>
                    Card:{" "}
                    {user.card.map((card) => {
                      return <span>{`${card} `}</span>;
                    })}
                  </Text>
                ) : (
                  <Text>Out</Text>
                )}
              </Person>
            );
          })}
        </StatusWrapper>
      </Modal>
    </>
  );
};

export default RoundEnd;
