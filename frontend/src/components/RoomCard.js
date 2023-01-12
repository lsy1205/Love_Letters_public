import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useGame } from "../hooks/useGame";

const RoomCard = ({ name, number, setRoomFull }) => {
  const navigate = useNavigate();
  const { me, enterRoom } = useGame();

  const roomImg = [
    "https://i.imgur.com/0FwWLOc.png",
    "https://i.imgur.com/XnCW9YR.png",
    "https://i.imgur.com/kx3KUmw.png",
    "https://i.imgur.com/NwlGRui.png",
    "https://i.imgur.com/CIQrHhT.png",
    "https://i.imgur.com/EwcrSMQ.png",
    "https://i.imgur.com/OPDvp6Q.png",
    "https://i.imgur.com/SIXpXUp.png",
    "https://i.imgur.com/xxSKmsO.jpg",
    "https://i.imgur.com/fxe63A1.png",
  ];

  const handleRoom = async (name) => {
    if (number === 4) {
      setRoomFull(true);
      return;
    }
    await enterRoom({ variables: { name: me, roomName: `10${name}` } });
    navigate("/room/" + `10${name}`);
  };

  return (
    <Card
      hoverable
      style={{
        width: "15vw",
        height: "16vw",
        marginLeft: "1vw",
        marginRight: "1vw",
      }}
      cover={
        <>
          <img
            onClick={() => handleRoom(name)}
            style={{ width: "15vw", height: "12vw" }}
            alt="example"
            src={roomImg[name]}
          />
          <div style={{ width: "15vw", height: "1vw" }}></div>
          <div
            style={{
              width: "15vw",
              height: "2vw",
              fontSize: "1.3vw",
              textAlign: "center",
            }}
          >
            Room{name} : {number}
          </div>
        </>
      }
    ></Card>
  );
};

export default RoomCard;
