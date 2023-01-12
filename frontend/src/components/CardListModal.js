import styled from "styled-components";
import { Button, Modal } from "antd";
import { useState } from "react";
const CardListButton = styled(Button)`
  position: absolute;
  top: 90%;
  left: 72%;
  background-color: #a56031;
`;

const CardListModal = () => {
  // Card List Modal
  const [cardListModalOpen, setCardListModalOpen] = useState(false);
  // Card List Modal
  const showCardListModal = () => {
    setCardListModalOpen(true);
  };
  const cardListModalCancel = () => {
    setCardListModalOpen(false);
  };
  return (
    <>
      <CardListButton
        size="large"
        shape="circle"
        type="primary"
        onClick={showCardListModal}
      >
        ?
      </CardListButton>

      <Modal
        title="List of Cards"
        open={cardListModalOpen}
        onCancel={cardListModalCancel}
        style={{
          top: "4%",
          content: "url(https://i.imgur.com/1bDg2Be.jpg)",
          height: "95%",
          width: "25%",
        }}
      ></Modal>
    </>
  );
};
export default CardListModal;
