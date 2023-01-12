import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import StartPage from "./components/StartPage";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Game from "./containers/Game";
import Lobby from "./containers/Lobby";
import Room from "./components/Room";
import Lucky from "./components/Lucky";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/">
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<StartPage />} />
          <Route path="login" element={<Login />} />
          <Route path="game/:room/:name" element={<Game />} />
          <Route path="room/:roomName" element={<Room />} />
          <Route path="lobby" element={<Lobby />} />
          <Route path="*" element={<h1>Error, Page Not Found</h1>} />
          <Route path="lucky" element={<Lucky />} />
          {/* <Route path="console" element={<GameConsole />} /> */}
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
