# [111-1] Web Programming Final
## (Group 98) Love Letters
### 組員：
B09901019 劉瑄穎
B09901021 鄭定緯
B09901091 施惠馨
### Demo 影片連結：https://youtu.be/uDEYVrVy9Ak
### 描述這個服務在做什麼：
情書是一個線上桌遊軟體，主要功能有：
1. 使用者註冊/登入：提供註冊與登入的服務，註冊時需填寫帳號密碼。
2. 大廳頁面： 總共有10個房間，可以任一挑選未滿4人的房間進入。
3. 房間頁面：玩家可設定準備/取消準備，當4位玩家都已準備，會直接跳入遊戲頁面。
4. 遊戲頁面： 我們參考情書桌遊訂出遊戲規則。每個玩家都有屬於自己的玩家頁面，可以看到對手抽排、出牌狀態，並提供每個對手出牌、執行卡牌功能、淘汰的資訊。遊戲結束時會跳出Result Modal，顯示贏家與每位玩家手上剩下的排，可點選回到房間頁面。
Deployed 連結：請參考下方 Deploy 網址項目
使用之第三方套件、框架、程式碼：
Frontend: React, Apollo/client, lucky-canvas/react, react-router-dom, antd, styled-components
Backend: uuidv4, bcrypt, graphql, mongoose, dotenv-defaults, express, lodash, ws
Database: MongoDB Atlas
Deployment: Railway
### 心得：
* B09901019 劉瑄穎：
這次期末專題我主要負責各個路徑、前端邏輯與部分的畫面設計，做完的時候真的很有成就感，也不禁讓我感嘆現在網路服務真是厲害，我們光做一個小的 project 就這麼辛苦，網路上的神人真的很強，做專題時我們也遇到很多困難，google 是我們最好的老師，此次專題也讓我學會如何快速地看懂document以及與別人協作。做專題的過程中，我覺得有很多細節需要處理，尤其是在前端必須擋使用者的神奇操作，但能完成真的很有成就感，也很謝謝組員凱瑞我，上完這堂課後就像是開啟了一扇大門網路服務的大門，未來希望能繼續自我精進，更加理解網路服務的世界。
* B09901021 鄭定緯：
這次的專題我負責後端的部分，我選擇使用graphql來實作。雖然上課的時候已經有練習過了，但整個過程中還是遇到不少的問題。特別是前端與後端溝通的部分，要與別人合力做出一個專案，實在是一件很困難的事。好在經過好幾天的埋頭苦幹，我們終於做出一個能運作的網頁和伺服器。雖然可能還有一些bug沒有修好，但整體來說我們非常滿意，也感到成就感滿滿。很高興我能修到這堂課，我學到了很多新知，也體驗了一學期充實的電機系生活。
* B09901091 施惠馨：我主要負責寫前端還有畫面設計的部分，覺得合作寫code比我想像的複雜很多，常常會改到同一個檔案，就必須要處理merge的問題。而且因為時間的限制，剛開始畫了初版的架構，真正開始做才發現會遇到太多的問題，所以一直不斷地修正、和隊友溝通。而且因為整個版面都需要自己設計，所以也常需要處理牌版的問題。最後終於完成整個網頁的時候，真的非常有成就感，覺得有把這學期所學的內容應用出來。
使用/操作方式
### [遊戲流程]：
1. 輪到玩家時會從牌庫中抽一張牌。
2. 玩家必須從從手中的兩張牌中打出一張，並執行該張牌的效果。
3. 角色卡分成1~8號，每個角色的張數、技能都不一樣。括弧中的數字代表角色在整副牌中的張數。頁面上有提供提示卡。
### [遊戲規則]：
1. 衛兵（5張）：猜任一個玩家的手牌，猜對該玩家出局，猜錯沒事。不可以猜1號。
2. 神父（2張）：私底下查看任一位玩家的手牌，不可以公開給其他玩家。
3. 男爵（2張）：私底下與任一位玩家用手牌比大小，數字小的玩家出局，平手沒事。
4. 侍女（2張）：打出此卡的玩家，在下次輪到他之前，都是無敵的狀態，其他玩家不可以對他使用技能。例如：猜牌、比大小。
5. 王子（2張）：指定任一位玩家面朝上棄掉手牌，並再抽一張新牌。可以指定自己。
6. 國王（1張）：與任一位玩家交換手牌。
7. 公爵夫人（1張）：當玩家手中有王子或國王與公爵夫人，必須打出公爵夫人，不可以打出王子或國王。
8. 公主（1張）：玩家若棄掉該牌，直接出局。
### [遊戲結束]：
1. 在牌庫抽完前，只剩一位玩家未出局，該玩家獲勝。
牌庫抽完後，還有兩位以上的玩家為出局時，未出局的所有玩家公開手牌比大小，最大的玩家獲勝。

## localhost 安裝 / 測試 / 執行: 以下指令皆在最外層(wp1111/final）
  - 安裝：yarn install:all 
  - 先跑後端：yarn server
  - 跑前端： yarn start
  - 請在 final/backend 加入.env檔案，形式如下：
      - MONGO_URL = 
  - 在local端測試時，請先開啟後端server，再到 http://localhost:4000/graphql
  graphql playground 執行mutation createRoom來創造房間，如下圖所示。房間名稱請寫為100、101、102、103、104、105、106、107、108、109共十個房間，不同的名稱可能會導致前端出錯
  ![](https://i.imgur.com/7fJZv0w.png)

## 測試流程：
 - step1: 請到Sign up 畫面 Sign up 一個帳號
 - step2: 回到登入畫面 登入帳號 
    - 因為前端的資訊存在 localstorage local 測試時請使用不同 port 登入不同帳號
    - deploy 網址測試時請使用不同裝置登入不同帳號遊玩
 - step3: 進入大廳可以選空房間進入
 - step4: 在房間中等待其他人或離開房間（取消準備才可離開）
 - step5: 當四人皆準備時 可以進入遊戲
 - step6: 遊戲畫面簡介
    - 右上角 Battle Log 會跳出目前遊戲狀態
    - 左下角有個音樂符號可開啟背景音樂
    - 左上角玩家狀態可以看到各個玩家名字以及現在是誰的回合
    - 輪到的位置會有兩張手牌
 - step7: 遊戲流程簡介
    - 輪到玩家時會跳出 Your Turn 並擁有兩張手牌
    - 在自己的回合 選擇一張手牌按下 即可使用手牌 若卡牌效果需選擇對手 請點擊對手的方框才會使用
    - 若使用衛兵 按下選擇對手後 會跳出想猜測的卡牌 點選 Guess 後才可使用衛兵
    - 等待其他玩家出牌 重複直到遊戲結束條件
    - 結束條件：只剩一個玩家沒有出局 或牌堆無牌時 剩下手牌最大者勝利
 - step8: 結束後會跳出遊戲結果 顯示贏家以及玩家結束時狀態（剩下手牌）
 - step9: 按下 Back to Room 按鈕回到房間等待下一局
 - step10: 離開房間後 右上角 Sign Out 可以登出
 - step11: 小遊戲 -- 在大廳中可以點選右上角Love Spin 按鈕可以進入轉轉樂抽土味情話

### Deploy網址
* url: https://finalv3-production.up.railway.app/

### 每位組員負責項目 
* B09901021 鄭定緯：
  - 後端邏輯以及遊戲內容設定、deploy
* B09901019 劉瑄穎：
  - 前端路徑設置、前端邏輯以及前端後端溝通
* B09901091 施惠馨：
  - 靜態網頁設計、附加小遊戲設計、卡牌繪製

### 引用套件
* Frontend: 
React, Apollo/client, lucky-canvas/react, react-router-dom, antd, styled-components
* Backend: 
uuidv4, bcrypt, graphql, mongoose, dotenv-defaults, express, lodash, ws
Database: MongoDB Atlas
* Deployment: Railway

### github repo 網址: https://github.com/Huixin-oooo/wp1111/tree/main/final

### 聯絡方式
* B09901019 劉瑄穎:
  - 臉書：https://www.facebook.com/profile.php?id=100007573579175
  - 信箱：b09901019@ntu.edu.tw
* B09901021 鄭定緯:
  - 臉書：https://www.facebook.com/profile.php?id=100007650513116
  - 信箱：b09901021@ntu.edu.tw
* B09901091 施惠馨:
  - 臉書：https://www.facebook.com/profile.php?id=100007112144780
  - 信箱：b09901091@ntu.edu.tw
