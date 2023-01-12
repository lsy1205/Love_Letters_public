import styled from "styled-components";
import { Button, Card, Meta } from "antd";
import RoomCard from "../components/RoomCard";
import { useMutation, useQuery } from "@apollo/client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
import {
  CHECK_LOGIN,
  LOGOUT,
  ROOMLIST_QUERY,
  ROOMLIST_SUBSCRIPTION,
} from "../graphql";
import { handleError } from "@apollo/client/link/http/parseAndCheckHttpResponse";
import { useEffect, useState } from "react";
import { useGame } from "../hooks/useGame";
import { Navigate, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-image: url(https://i.imgur.com/sr0A5VW.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const TopWrappeer = styled.div`
  position: absolute;
  top: 5vh;
  right: 5vw;
  display: flex;
  flex-direction: row-reverse;
  width: 18vw;
  height: 5vh;
  justify-content: space-around;
`;

const UserWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: 8.5vw;
  top: 5vh;
  font-size: 2vw;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.7);
  height: 10vh;
  width: 30vw;
  border-radius: 5vh;
`;

const RoomWrapper = styled.div`
  position: absolute;
  top: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  height: 75vh;
`;
const Lobby = () => {
  const { me, login, setLogin } = useGame();
  const { data, loading, subscribeToMore } = useQuery(ROOMLIST_QUERY);
  const [logout] = useMutation(LOGOUT);
  const navigate = useNavigate();
  const [roomFull, setRoomFull] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { data: checkLogin, loading: checkLoading } = useQuery(CHECK_LOGIN, {
    variables: { name: me },
  });
  let roomList = [];
  if (!loading) {
    roomList = data.roomList;
  }
  if (!checkLoading) {
    const isLogin = checkLogin?.logIn ?? false;
    if (!isLogin) {
      navigate("/login");
    }
  }
  useEffect(() => {
    if (roomFull) {
      messageApi.open({
        duration: "2",
        type: "error",
        content: "滿了啦 擠什麼擠",
      });
      setRoomFull(false);
    }
  }, [roomFull]);
  useEffect(() => {
    try {
      subscribeToMore({
        document: ROOMLIST_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const roomList = subscriptionData.data.roomList;
          // // console.log(roomList);
          return {
            roomList,
          };
        },
      });
    } catch (e) {
      // console.log("Error in subscription:", e);
    }
  }, [subscribeToMore]);
  const handleLogout = () => {
    logout({ variables: { name: me } });
    setLogin(false);
    navigate("/login");
  };
  const handleLove = () => {
    navigate("/lucky");
  };

  return loading ? (
    <Wrapper>loading</Wrapper>
  ) : (
    <Wrapper>
      {contextHolder}
      <UserWrapper>
        <Avatar
          style={{ backgroundColor: "rgb(180,180,180)", border: "1.5px solid" }}
          icon={<UserOutlined />}
        />
        <div style={{ margin: "5px" }}>{" Player: " + me}</div>
      </UserWrapper>
      <TopWrappeer>
        <Button onClick={handleLogout}>Sign Out</Button>
        <Button onClick={handleLove} danger>
          Love Spin
        </Button>
      </TopWrappeer>
      <RoomWrapper>
        {roomList.map((room, index) => {
          return (
            <RoomCard
              key={index}
              name={index}
              number={room}
              setRoomFull={setRoomFull}
              roomFull={roomFull}
            />
          );
        })}
      </RoomWrapper>
    </Wrapper>
  );
};

export default Lobby;
