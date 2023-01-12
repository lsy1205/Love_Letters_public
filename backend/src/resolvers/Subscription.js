const Subscription = {
  roomList: {
    subscribe: (parent, _, { pubsub }) => {
      console.log("subscribe roomlist");
      return pubsub.subscribe("roomList");
    },
  },
  roomPlayer: {
    subscribe: (parent, { roomName }, { pubsub }) => {
      console.log("subscribe roomplayer");
      return pubsub.subscribe(`room ${roomName}`);
    },
  },
  game: {
    subscribe: (parent, { name, roomName }, { pubsub }) => {
      console.log("subscribe game");
      return pubsub.subscribe(`room ${roomName} name ${name}`);
    },
  },
};
export default Subscription;
