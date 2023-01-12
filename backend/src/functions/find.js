import RoomModel from "../models/room";

export const findRoomList = async () => {
  const rooms = await RoomModel.find({});
  //console.log(rooms);
  let roomlist = [];
  for (let i = 0; i < rooms.length; i++) {
    roomlist.push(rooms[i].users.length);
  }
  return roomlist;
};
export const findRoomPlayer = async (roomName) => {
  let room = await RoomModel.findOne({ name: roomName }).populate(
    "users",
    "name isPrepared -_id"
  );
  if (!room) return [{ name: "不要亂搞阿老鐵" }];
  let users = [];
  for (let i = 0; i < room.users.length; i++) {
    users.push({
      name: room.users[i].name,
      isPrepared: room.users[i].isPrepared,
    });
  }
  //console.log(users);
  return users;
};
