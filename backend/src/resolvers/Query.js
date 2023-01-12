import bcrypt from "bcrypt";
import { cloneDeep } from "lodash";
import { findRoomList, findRoomPlayer } from "../functions/find";
import { v4 as uuidv4 } from "uuid";

const Query = {
  roomList: async (parent, _, { RoomModel }) => {
    const roomList = await findRoomList();
    return roomList;
  },
  signIn: async (parent, { name, password }, { UserModel }) => {
    console.log("signIn");
    let user = await UserModel.findOne({ name });
    if (!user) {
      return "invalid account";
    }
    const res = await bcrypt.compare(password, user.password);
    if (!res) return "invalid password";
    user.isLogedIn = true;
    user.token = uuidv4();
    await user.save();
    return user.token;
  },
  roomPlayer: async (parent, { roomName }, { RoomModel }) => {
    const roomPlayer = await findRoomPlayer(roomName);
    return roomPlayer;
  },
  logIn: async (parent, { name }, { UserModel }) => {
    const user = await UserModel.findOne({ name });
    return user?.isLogedIn;
  },
  game: async (parent, { name, roomName }, { UserModel, RoomModel }) => {
    console.log("query game");
    const room = await RoomModel.findOne({ name: roomName }).populate(
      "users",
      "name card out protected"
    );
    const users = room.users;
    let usersReturn = cloneDeep(users);
    for (let i = 0; i < 4; i++) {
      if (name !== users[i].name) {
        usersReturn[i].card = [];
      }
    }
    return {
      //end: room.end,
      log: room.log,
      //winner,
      turn: room.turn,
      cardLeft: room.cards.length,
      users: usersReturn,
    };
  },
  route: async (parent, { name, token }, { UserModel }) => {
    console.log("query route", name);
    const user = await UserModel.findOne({ name });
    if (!user) return "你怪怪的喔";
    if (!token) return "你怪怪的喔";
    if (user?.token === token || user?.route === "/login") {
      return user.route;
    }
    return "你怪怪的喔";
  },
};
export default Query;
