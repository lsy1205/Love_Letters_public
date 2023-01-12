import UserModel from "../models/user";
import RoomModel from "../models/room";

export const changeIsPrepared = async (name, isPrepared, roomName) => {
  let room = await RoomModel.findOne({ name: roomName }).populate(
    "users",
    "name"
  );
  //console.log(room);
  if (!room) return false;
  let exist = false;
  for (let i = 0; i < room.users.length; i++) {
    if (name === room.users[i].name) exist = true;
    //console.log(name, room.users[i].name);
  }
  //console.log(exist);
  if (!exist) return false;
  let user = await UserModel.findOne({ name });
  user.isPrepared = isPrepared;
  await user.save();
  return true;
};
