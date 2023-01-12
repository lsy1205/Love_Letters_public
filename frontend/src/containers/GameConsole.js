import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { Typography, Button, Divider } from "antd";
import Message from "../components/Message";

const { Text, Title } = Typography;

const ConsoleWrapper = styled.div`
  position: absolute;
  top: 3vh;
  right: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(200, 200, 255, 1);
  height: 30vh;
  width: 25vw;
  border-radius: 20px;
  padding: 10px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 25vh;
  width: 23vw;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  overflow: auto;
  padding: 20px;
`;

const Footer = styled.div`
  height: 1px;
`;

const GameConsole = ({ messages }) => {
  const msgFooter = useRef(null);
  const [msgSent, setMsgSent] = useState(false);
  const [msgList, setMsgList] = useState(messages);

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);
  useEffect(() => {
    setMsgSent(true);
  }, [msgList]);
  useEffect(() => {
    setMsgList(messages);
  });

  return (
    <ConsoleWrapper>
      <Title level={4}>Battle Log</Title>
      <MessageWrapper>
        {msgList.map((m, index) => {
          return (
            <>
              <Message message={m} key={`msg${index}`} />
              {/* {index !== messages.length - 1 ? (
                <Divider
                  style={{ height: "10px" }}
                  size="small"
                  key={`divider${index}`}
                />
              ) : (
                ""
              )} */}
            </>
          );
        })}
        <Footer ref={msgFooter} />
      </MessageWrapper>
      {/* <Button
        onClick={() => {
          setMessages((prev) => {
            return [...prev, "1"];
          });
        }}
      >
        add{" "}
      </Button> */}
    </ConsoleWrapper>
  );
};

export default GameConsole;
