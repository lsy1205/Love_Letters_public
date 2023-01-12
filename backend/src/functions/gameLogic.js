import RoomModel from "../models/room";
import { cloneDeep } from "lodash";

export default async (from, to, card, pubsub, roomName, cardTo) => {
  //extract data
  let room = await RoomModel.findOne({ name: roomName }).populate(
    "users",
    "name card out protected"
  );
  let users = room.users;
  let index = users.findIndex((user) => user.name === from);
  let indexTo = users.findIndex((user) => user.name === to);

  //check if valid
  if (from !== room.turn) {
    console.log("wtf it is not your turn");
    return false;
  }
  if (!users[index].card.includes(card)) {
    console.log("wtf you don't have that card");
    return false;
  }
  if (users[indexTo]?.protected ?? false) {
    console.log("wtf that guy is protected");
    return false;
  }
  if (users[indexTo]?.out ?? false) {
    console.log("wtf that guy is already out");
    return false;
  }
  if (indexTo === -1 && to) {
    console.log("wtf who is that guy");
    return false;
  }

  //出牌、解除保護
  let log = "";
  let show = false;
  users[index].protected = false;
  users[index].card.splice(users[index].card.indexOf(card), 1);
  const cardType = [
    "0",
    "衛兵",
    "神父",
    "男爵",
    "侍女",
    "王子",
    "國王",
    "公爵夫人",
    "公主",
  ];

  //執行卡牌效果
  switch (card) {
    case 1:
      if (!to || !cardTo) {
        log = log.concat(`${from}打出了衛兵 `);
        break;
      }
      log = log.concat(`${from}對${to}打出了衛兵 `);
      if (cardTo === users[indexTo].card[0]) {
        log = log.concat(`${to}是${cardType[cardTo]} ${to}出局 `);
        users[indexTo].card.pop();
        users[indexTo].out = true;
      } else {
        log = log.concat(`${to}不是${cardType[cardTo]} `);
      }
      break;
    case 2:
      if (!to) {
        log = log.concat(`${from}打出了神父 `);
        break;
      }
      log = log.concat(`${from}對${to}打出了神父 `);
      show = true;
      break;
    case 3:
      if (!to) {
        log = log.concat(`${from}打出了男爵 `);
        break;
      }
      log = log.concat(`${from}對${to}打出了男爵 `);
      if (users[indexTo].card[0] > users[index].card[0]) {
        log = log.concat(`${from}出局 `);
        log = log.concat(`${from}是${cardType[users[index].card[0]]} `);
        users[index].card.pop();
        users[index].out = true;
      } else if (users[index].card[0] > users[indexTo].card[0]) {
        log = log.concat(`${to}出局 `);
        log = log.concat(`${to}是${cardType[users[indexTo].card[0]]} `);
        users[indexTo].card.pop();
        users[indexTo].out = true;
      } else {
        log = log.concat(`${from}和${to}一樣小 沒有人出局 `);
      }
      break;
    case 4:
      users[index].protected = true;
      log = log.concat(`${from}打出了侍女 ${from}受一輪保護 `);
      break;
    case 5:
      if (!to) {
        log = log.concat(`${from}打出了王子 `);
        break;
      }
      log = log.concat(`${from}對${to}打出了王子 `);
      log = log.concat(`${to}棄掉了${cardType[users[indexTo].card[0]]} `);
      if (users[indexTo].card[0] === 8) {
        users[indexTo].card.pop();
        users[indexTo].out = true;
        log = log.concat(`${to}出局 `);
        break;
      }
      if (room.cards.length === 0) {
        users[indexTo].card.pop();
        users[indexTo].out = true;
        log = log.concat(`排堆空了 ${to}出局 `);
        break;
      }
      users[indexTo].card.pop();
      users[indexTo].card.push(room.cards.pop());
      break;
    case 6:
      if (!to) {
        log = log.concat(`${from}打出了國王 `);
        break;
      }
      log = log.concat(`${from}對${to}打出了國王 `);
      log = log.concat(`${from}和${to}交換手牌 `);
      let c = users[index].card[0];
      users[index].card[0] = users[indexTo].card[0];
      users[indexTo].card[0] = c;
      break;
    case 7:
      log = log.concat(`${from}打出了公爵夫人 `);
      break;
    case 8:
      users[index].out = true;
      users[index].card.pop();
      log = log.concat(`${from}打出了公主 ${from}出局 `);
      break;
  }

  //判斷遊戲是否結束
  let end = false;
  let winner = [];
  let usersAlive = cloneDeep(users);
  usersAlive = usersAlive.filter((user) => !user.out);
  if (usersAlive.length === 1) {
    winner.push(usersAlive[0].name);
    log = log.concat(`遊戲結束 贏家是${usersAlive[0].name} `);
    end = true;
  } else if (room.cards.length === 0) {
    end = true;
    let max = 0;
    for (let i = 0; i < usersAlive.length; i++) {
      if (usersAlive[i].card[0] > max) max = usersAlive[i].card[0];
    }
    usersAlive = usersAlive.filter((user) => user.card[0] === max);
    log = log.concat(`遊戲結束 贏家是`);
    for (let i = 0; i < usersAlive.length; i++) {
      log = log.concat(`${usersAlive[i].name}`);
      if (i !== usersAlive.length - 1) log = log.concat("和");
      winner.push(usersAlive[i].name);
    }
  }

  //遊戲結束
  if (end) {
    for (let i = 0; i < 4; i++) {
      pubsub.publish(`room ${roomName} name ${users[i].name}`, {
        game: {
          end,
          log,
          winner,
          users,
          cardUsed: card,
          cardLeft: room.cards.length,
        },
      });
      users[i].out = false;
      users[i].protected = false;
      users[i].isPrepared = false;
      await users[i].save();
    }
    room.turn = "";
    room.log = "";
    room.cards = [];
    await room.save();
    return true;
  }

  //下一回合、發牌
  let next = index;
  for (let i = 0; i < 4; i++) {
    next = (next + 1) % 4;
    if (!users[next].out) break;
  }
  room.turn = users[next].name;
  room.log = room.log.concat(log);
  users[next].card.push(room.cards.pop());
  for (let i = 0; i < 4; i++) {
    await users[i].save();
  }
  await room.save();

  //piblish data
  for (let i = 0; i < 4; i++) {
    let usersReturn = cloneDeep(users);
    let logReturn = log;
    if (show && i === index) {
      for (let j = 0; j < 4; j++) {
        if (j === indexTo) {
          usersReturn[j].card = users[j].card.slice(0, 1);
        } else if (i !== j) {
          usersReturn[j].card = [];
        }
      }
      logReturn = logReturn.concat(
        `${to}是${cardType[users[indexTo].card[0]]} `
      );
    } else {
      for (let j = 0; j < 4; j++) {
        if (i !== j) {
          usersReturn[j].card = [];
        }
      }
    }
    pubsub.publish(`room ${roomName} name ${users[i].name}`, {
      game: {
        end,
        log: logReturn,
        turn: room.turn,
        cardLeft: room.cards.length,
        cardUsed: card,
        users: usersReturn,
      },
    });
  }
  return true;
};
