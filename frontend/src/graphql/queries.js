import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query signIn($name: String!, $password: String!) {
    signIn(name: $name, password: $password)
  }
`;

export const ROOMLIST_QUERY = gql`
  query roomList {
    roomList
  }
`;

export const ROOM_QUERY = gql`
  query roomPlayer($roomName: String!) {
    roomPlayer(roomName: $roomName) {
      name
      isPrepared
    }
  }
`;

export const CHECK_LOGIN = gql`
  query logIn($name: String!) {
    logIn(name: $name)
  }
`;

export const GAME_START = gql`
  query game($name: String!, $roomName: String!) {
    game(name: $name, roomName: $roomName) {
      end
      log
      turn
      cardLeft
      cardUsed
      winner
      users {
        name
        out
        card
        protected
      }
    }
  }
`;

export const FIND_ROUTE = gql`
  query route($name: String!, $token: String) {
    route(name: $name, token: $token)
  }
`;
