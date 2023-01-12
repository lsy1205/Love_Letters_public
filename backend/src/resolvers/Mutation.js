import bcrypt from "bcrypt";
import { findRoomList, findRoomPlayer } from "../functions/find";
import { changeIsPrepared } from "../functions/change";
import startGame from "../functions/startGame";
import action from "../functions/gameLogic";
const Mutation = {
  signUp: async (parent, { name, password }, { UserModel }) => {
    console.log("signUp");
    let user = await UserModel.findOne({ name });
    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      user = await new UserModel({
        name,
        password: hash,
        isPrepared: false,
        isLogedIn: false,
        route: "",
        token: "",
      }).save();
      return "account created";
    }
    return "name already in use";
  },
  createRoom: async (parent, { name }, { RoomModel }) => {
    await new RoomModel({ name, users: [], cards: [], turn: "" }).save();
    return true;
  },
  enterRoom: async (
    parent,
    { name, roomName },
    { UserModel, RoomModel, pubsub }
  ) => {
    const user = await UserModel.findOne({ name });
    const room = await RoomModel.findOne({ name: roomName });
    if (!user || !room) return "不要亂搞阿老鐵";
    if (room.users.length >= 4) return "already full";
    room.users.push(user);
    await room.save();
    const roomList = await findRoomList();
    const roomPlayer = await findRoomPlayer(roomName);
    pubsub.publish("roomList", {
      roomList: roomList,
    });
    pubsub.publish(`room ${roomName}`, {
      roomPlayer: roomPlayer,
    });
    return "entered";
  },
  leaveRoom: async (parent, { name, roomName }, { RoomModel, pubsub }) => {
    const room = await RoomModel.findOne({ name: roomName }).populate(
      "users",
      "name"
    );
    console.log(room);
    room.users = room.users.filter((item) => {
      //console.log(item);
      return item.name !== name;
    });
    //console.log(room.users);
    await room.save();
    const roomList = await findRoomList();
    const roomPlayer = await findRoomPlayer(roomName);
    pubsub.publish("roomList", {
      roomList: roomList,
    });
    pubsub.publish(`room ${roomName}`, {
      roomPlayer: roomPlayer,
    });
    return "leaved";
  },
  prepare: async (parent, { name, roomName }, { pubsub }) => {
    console.log("prepare", name);
    let success = await changeIsPrepared(name, true, roomName);
    if (!success) return "你到底在幹甚麼";
    const roomPlayer = await findRoomPlayer(roomName);
    pubsub.publish(`room ${roomName}`, {
      roomPlayer: roomPlayer,
    });
    if (roomPlayer.length < 4) return "幹的好啊";
    for (let i = 0; i < 4; i++) {
      if (!roomPlayer[i].isPrepared) return "幹的好啊";
    }
    await startGame(roomName);
    roomPlayer.push({ name: "startGame", isPrepared: true });
    pubsub.publish(`room ${roomName}`, {
      roomPlayer: roomPlayer,
    });
    return "遊戲開始囉";
  },
  unprepare: async (parent, { name, roomName }, { pubsub }) => {
    console.log("unprepare", name);
    let success = await changeIsPrepared(name, false, roomName);
    if (!success) return "你到底在幹甚麼";
    const roomPlayer = await findRoomPlayer(roomName);
    pubsub.publish(`room ${roomName}`, {
      roomPlayer: roomPlayer,
    });
    return "幹的好啊";
  },
  logout: async (parent, { name }, { UserModel }) => {
    console.log("logout");
    let user = await UserModel.findOne({ name });
    if (!user) return false;
    user.isLogedIn = false;
    user.token = "";
    user.route = "/login";
    await user.save();
    return true;
  },
  action: async (parent, { from, to, card, roomName, cardTo }, { pubsub }) => {
    console.log("action", from, to, card, roomName);
    return await action(from, to, card, pubsub, roomName, cardTo);
  },
  route: async (parent, { name, token, route }, { UserModel }) => {
    console.log("mutation route", name);
    let user = await UserModel.findOne({ name });
    if (!user) return "又沒有這個人";
    //console.log(token, user.token);
    if (token !== user.token) return "你這樣是非法入侵喔";
    user.route = route;
    await user.save();
    return "歡迎光臨";
  },
};
export default Mutation;
