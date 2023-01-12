import React, { useState, useEffect } from "react";
import { Switch } from 'antd';

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
    audio.loop = true;
  }

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div style={{position: "absolute", bottom: "3vh", left:"3vw"}}>
      {"🎵 "}
      <Switch onChange={toggle} checkedChildren="▷" unCheckedChildren="| |"></Switch>
      
    </div>
  );
};

export default Player;