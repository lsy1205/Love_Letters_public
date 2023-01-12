import "./YourTurn.css";

const NextRound = ({round}) => {
  return (
    <>
      <div className="wall"></div>
      <div className="turn">Round {round} !</div>
    </>
  );
};

export default NextRound;
