import mongoose from "mongoose";
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  cards: [Number],
  turn: { type: String },
  log: { type: String },
});
const RoomModel = mongoose.model("Room", RoomSchema);

export default RoomModel;
