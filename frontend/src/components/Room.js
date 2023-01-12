import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGame } from "../hooks/useGame";
import { Button, Typography, Tag, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  LEAVE_ROOM,
  PREPARE,
  ROOM_PLAYERS,
  ROOM_QUERY,
  UNPREPARE,
} from "../graphql";
import { useState } from "react";
import deepClone from "../utils/DeepClone";

const { Text, Link, Title } = Typography;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("https://i.imgur.com/IPHsQ59.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`;

const FooterWrapper = styled.div`
  position: absolute;
  top: 85vh;
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: center;
`;

const PlayerWrapper = styled.div`
  position: absolute;
  width: 90vw;
  height: 50vh;
  top: 28vh;
  display: flex;
  flex-direction: row;
  ${"" /* border: 1px solid; */}
  justify-content: space-around;
`;

const Player = styled.div`
  width: 20%;
  height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 4.5vw;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  ${"" /* border: 2px solid rgba(255, 255, 255); */}
`;
const PlayerTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;
const StyledPrepareTag = styled(Tag)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledUnprepareTag = styled(Tag)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50vw;
  height: 10vh;
  ${"" /* border: 1px solid; */}
`;
const StyledButton = styled(Button)`
  margin: 1vw;
`;
const Room = () => {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const { me, gameStart, setGameStart } = useGame();
  // // console.log(roomName);

  const [leaveRoom] = useMutation(LEAVE_ROOM);
  const [prepare] = useMutation(PREPARE);
  const [unprepare] = useMutation(UNPREPARE);
  const [Pre, setPre] = useState("Prepare");
  const [allowLeave, setAllowLeave] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [prepareSuccess, setPrepareSuccess] = useState(false);
  const [unprepareSuccess, setUnprepareSuccess] = useState(false);
  useEffect(() => {
    if (!allowLeave) {
      messageApi.open({
        type: "error",
        content: "Unprepare First to Leave Room",
      });
      setAllowLeave(true);
    }
  }, [allowLeave]);
  useEffect(() => {
    if (prepareSuccess) {
      messageApi.open({
        type: "success",
        content: "Prepared",
      });
      setPrepareSuccess(false);
    }
  }, [prepareSuccess]);
  useEffect(() => {
    if (unprepareSuccess) {
      messageApi.open({
        type: "success",
        content: "Unprepared",
      });
      setAllowLeave(true);
      setUnprepareSuccess(false);
    }
  }, [unprepareSuccess]);
  const handleLeave = () => {
    if (Pre === "Unprepare") {
      // // console.log("Unprepare first");
      setAllowLeave(false);
      return;
    }
    leaveRoom({ variables: { name: me, roomName: roomName } });
    navigate("/lobby");
  };
  const handlePrepare = async () => {
    if (Pre === "Unprepare") {
      await unprepare({ variables: { name: me, roomName: roomName } });
      setUnprepareSuccess(true);
      setPre("Prepare");
    } else {
      await prepare({ variables: { name: me, roomName: roomName } });
      setPrepareSuccess(true);
      setPre("Unprepare");
    }
  };

  const { data, loading, subscribeToMore } = useQuery(ROOM_QUERY, {
    variables: { roomName: roomName },
  });

  if (!loading) {
    // // console.log(data);
  }
  // useEffect(() => {
  //   if (data?.roomPlayer.length === 5) {
  //     navigate(`/game/${roomName}/${me}`);
  //   }
  // });

  useEffect(() => {
    try {
      subscribeToMore({
        document: ROOM_PLAYERS,
        variables: { roomName: roomName },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          let roomPlayer = subscriptionData.data.roomPlayer;
          if (roomPlayer.length === 5) {
            // console.log("呱呱");
            // console.log(prev);
            let newRoomPlayer = deepClone(prev);
            newRoomPlayer.roomPlayer[0].isPrepared = false;
            newRoomPlayer.roomPlayer[1].isPrepared = false;
            newRoomPlayer.roomPlayer[2].isPrepared = false;
            newRoomPlayer.roomPlayer[3].isPrepared = false;
            // console.log(newRoomPlayer);
            setGameStart(true);
            navigate(`/game/${roomName}/${me}`);
            return newRoomPlayer;
          }
          return {
            roomPlayer,
          };
        },
      });
    } catch (e) {
      // console.log("Error in subscription:", e);
    }
  }, [subscribeToMore]);

  return (
    <Wrapper>
      {contextHolder}
      <Title
        style={{ position: "absolute ", top: "10vh" }}
      >{`Room ${roomName}`}</Title>
      <Title level={3} style={{ position: "absolute", top: "14vh" }}>
        {data?.roomPlayer?.length < 4
          ? "Waiting For Other People..."
          : "It Seems That Someone Is Not Ready..."}
      </Title>
      <PlayerWrapper>
        {data?.roomPlayer.map((user, index) => {
          return (
            <Player key={index}>
              <PlayerTitle>
                {!data?.roomPlayer[index].isPrepared ? (
                  <StyledUnprepareTag color="red">X</StyledUnprepareTag>
                ) : (
                  <StyledPrepareTag color="green">✓</StyledPrepareTag>
                )}
                <Text strong>Player{index} </Text>
              </PlayerTitle>
              <Avatar
                size={100}
                shape="circle"
                style={{ height: "20vh", width: "20vh" }}
                icon={<UserOutlined />}
              />
              <Title level={3} style={{ marginTop: "3vh" }}>
                {user.name}
              </Title>
            </Player>
          );
        })}
      </PlayerWrapper>
      <FooterWrapper>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ButtonWrapper>
            <StyledButton size="large" danger onClick={handleLeave}>
              leaveroom
            </StyledButton>
            <StyledButton
              size="large"
              onClick={handlePrepare}
              style={{ width: "25vw" }}
            >
              {Pre}{" "}
            </StyledButton>
          </ButtonWrapper>
        )}
      </FooterWrapper>
    </Wrapper>
  );
};

export default Room;
