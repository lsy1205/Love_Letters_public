import { gql } from "@apollo/client";

export const ROOMLIST_SUBSCRIPTION = gql`
  subscription roomList {
    roomList
  }
`;

export const ROOM_PLAYERS = gql`
  subscription roomPlayer($roomName: String!) {
    roomPlayer(roomName: $roomName) {
      name
      isPrepared
    }
  }
`;

export const GAME_SUBSCRIPTION = gql`
  subscription game($name: String, $roomName: String!) {
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
