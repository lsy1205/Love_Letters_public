import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  password: {
    type: String,
    required: [true, "password field is required."],
  },
  isPrepared: {
    type: Boolean,
    required: [true, "isPrepared field is required."],
  },
  isLogedIn: {
    type: Boolean,
    required: [true, "isPrepared field is required."],
  },
  card: [Number],
  out: { type: Boolean },
  protected: { type: Boolean },
  route: { type: String },
  token: { type: String },
});
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
