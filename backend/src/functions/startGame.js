import RoomModel from "../models/room";

export default async (roomName) => {
  console.log("startGame");
  let room = await RoomModel.findOne({ name: roomName }).populate(
    "users",
    "name out card isPrepared"
  );
  let cards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
  room.cards = cards.sort(() => Math.random() - 0.5);
  room.turn = room.users[0].name;
  room.log = "";
  for (let i = 0; i < 4; i++) {
    let user = room.users[i];
    user.card = [];
    if (i === 0) user.card.push(room.cards.pop());
    user.card.push(room.cards.pop());
    user.out = false;
    user.protected = false;
    user.isPrepared = false;
    await user.save();
  }
  await room.save();
};
