import { gql } from "@apollo/client";

export const USER_PREPARE = gql`
  mutation prepare($name: String!, $roomName: String!) {
    prepare(name: $name, roomName: $roomName) {
      name
      isPrepared
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signUp($name: String!, $password: String!) {
    signUp(name: $name, password: $password)
  }
`;

export const LOGOUT = gql`
  mutation logout($name: String!) {
    logout(name: $name)
  }
`;

export const ENTER_ROOM = gql`
  mutation enterRoom($name: String!, $roomName: String!) {
    enterRoom(name: $name, roomName: $roomName)
  }
`;

export const LEAVE_ROOM = gql`
  mutation leaveRoom($name: String!, $roomName: String!) {
    leaveRoom(name: $name, roomName: $roomName)
  }
`;
export const PREPARE = gql`
  mutation prepare($name: String!, $roomName: String!) {
    prepare(name: $name, roomName: $roomName)
  }
`;

export const UNPREPARE = gql`
  mutation unprepare($name: String!, $roomName: String!) {
    unprepare(name: $name, roomName: $roomName)
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!) {
    createRoom(name: $name)
  }
`;

export const USE_CARD = gql`
  mutation action(
    $from: String!
    $to: String
    $card: Int!
    $roomName: String!
    $cardTo: Int
  ) {
    action(
      from: $from
      to: $to
      card: $card
      roomName: $roomName
      cardTo: $cardTo
    )
  }
`;

export const UPDATE_ROUTE = gql`
  mutation route($name: String!, $token: String!, $route: String!) {
    route(name: $name, token: $token, route: $route)
  }
`;
