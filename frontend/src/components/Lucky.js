import React, { useState } from "react";
import YourTurn from "./YourTurn";
import LuckySpin from "./LuckySpin";
import styled from "styled-components";

const WallWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url("https://i.imgur.com/ks9nq0Z.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`;

const Lucky = () => {

  return (
      <WallWrapper>
        <LuckySpin/>
      </WallWrapper>
  );
};

export default Lucky;
