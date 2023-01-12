import { useState, useContext, createContext } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { ENTER_ROOM, LOGIN_QUERY, ROOM_QUERY, USE_CARD } from "../graphql";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const GameContext = createContext({
  me: "",
  login: false,
  gameStart: false,
  setMe: () => {},
  setLogin: () => {},
  setGameStart: () => {},
  loginUser: () => {},
  enterRoom: () => {},
  action: () => {},
  // findRoom: () => {},
  // subescribeToMore: () => {},
});

const GameProvider = (props) => {
  const [me, setMe] = useState(savedMe || "");
  const [login, setLogin] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  // Connection //
  const [loginUser] = useLazyQuery(LOGIN_QUERY);
  const [enterRoom] = useMutation(ENTER_ROOM);
  const [action] = useMutation(USE_CARD);

  // const [findRoom, subescribeToMore] = useLazyQuery(ROOM_QUERY);

  return (
    <GameContext.Provider
      value={{
        me,
        login,
        gameStart,
        setGameStart,
        setMe,
        setLogin,
        loginUser,
        enterRoom,
        action,
        // findRoom,
        // subescribeToMore,
      }}
      {...props}
    />
  );
};

const useGame = () => useContext(GameContext);
export { GameProvider, useGame };
