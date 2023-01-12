import React, { useState } from "react";
import styled from "styled-components";

const UserWrapper = styled.div`
  height: 5vh;
  width: 9vw;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  text-align: center;
  border-radius: 3px;
`;

const GameUser = ({ players }) => {
  return (
    <>
      <UserWrapper style={{ top: "70vh", left: "1vw" }}>
        {players[0].name}
      </UserWrapper>
      <UserWrapper style={{ top: "70vh", right: "1vw" }}>
        {players[2].name}
      </UserWrapper>
      <UserWrapper style={{ top: "2vh", left: "23vw", width: "10vw" }}>
        {players[1].name}
      </UserWrapper>
    </>
  );
};

export default GameUser;
