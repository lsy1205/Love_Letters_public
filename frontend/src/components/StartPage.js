import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url("https://i.imgur.com/Y2cdGNN.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  top: 59vh;
  left: 21.5vw;
  height: 18vh;
  width: 10vw;
`;

const StartPage = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          type="primary"
          size="large"
          danger
          style={{ width: "10vw" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          type="primary"
          size="large"
          danger
          style={{ width: "10vw" }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default StartPage;
