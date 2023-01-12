import React, { useState, useRef } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import styled from "styled-components";
import { Button } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";

const TextWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 23vw;
  top: 43vh;
  left: 28vw;
  text-align:center;
  font-size: 1.5vw;
`;

const LetterWrapper = styled.div`
    position: absolute;
    display: flex;
    height: 45vh;
    width: 30vw;
    top: 32vh;
    left: 23vw;
    background-image: url('https://i.imgur.com/l62h4OQ.png');
    background-repeat: no-repeat;
    background-size: 35vw 40vh ;
`;
export default function LuckySpin() {
    const navigate = useNavigate();
  const [text, setText] = useState('')
  const [blocks] = useState([
    { padding: '10px', background: '#869cfa' }
  ])
  const [prizes] = useState([
    { background: '#e9e8fe', fonts: [{ text: '1' }] },
    { background: '#b8c5f2', fonts: [{ text: '2' }] },
    { background: '#e9e8fe', fonts: [{ text: '3' }] },
    { background: '#b8c5f2', fonts: [{ text: '4' }] },
    { background: '#e9e8fe', fonts: [{ text: '5' }] },
    { background: '#b8c5f2', fonts: [{ text: '6' }] },
  ])
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%', background: '#869cfa',
      pointer: true,
      fonts: [{ text: 'Start', top: '-10px' }]
    }
  ])
  const myLucky = useRef();
  const handleBackToLobby = () => {
    navigate("/lobby");
  };
  return (
    <>
        <div style={{position: "absolute", left:"60vw", top: "20vh"}}>
            <LuckyWheel
            ref={myLucky}
            width="300px"
            height="300px"
            blocks={blocks}
            prizes={prizes}
            buttons={buttons}
            onStart={() => {
                myLucky.current.play()
                setTimeout(() => {
                const index = Math.random() * 6 >> 0
                myLucky.current.stop(index)
                }, 2500)
            }}
            onEnd={prize => {
                switch(prize.fonts[0].text){
                    case '1':
                        setText("我有兩個心願，在你身邊和你在身邊。")
                        break;
                    case '2':   
                        setText("我有個秘密，需要嘴對嘴告訴你。");
                        break;
                    case '3':   
                        setText("報告~我變心了，今天變得比昨天還喜歡你。");
                        break;
                    case '4':   
                        setText("你有地圖嗎？我在你心裡迷路了。");            
                        break;
                    case '5':   
                        setText("我是九你是三，除了你還是你。");
                        break;
                    case '6':   
                        setText("我不想要世界和平，我只想要世界和你。");
                        break;
                }
            }}
            />
        </div>
        <div style={{position:"absolute",top:"15vh", left:"28vw", fontSize:"5vw"}}>Love Spin</div>
        <LetterWrapper></LetterWrapper>
        <TextWrapper>{text}</TextWrapper>
        <Button danger onClick={handleBackToLobby} style={{position:"absolute",top:"5vh", right:"5vw"}}>Back to Lobby</Button>
    </>
  )
}
