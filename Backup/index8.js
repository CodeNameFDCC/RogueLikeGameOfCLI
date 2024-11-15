//#region Player Info
let gold = 0;
let countOfPlay = 0;
let playerName = "홍길동";
//#endregion

//#region 입력
import readlineSync from "readline-sync";

//입력 타임!!!
function Input(str) {
  return readlineSync.question(str);
}
//#endregion

//#region 출력

async function typeEffect(text, ms = 50) {
  // 정규 표현식을 사용하여 문자열을 ,와 .를 기준으로 나누고, 각 부분에 줄 바꿈 추가
  const formattedText = text.replace(".,", ".").replace(/([.,])\s*/g, "$1\n");

  console.clear();
  for (let char of formattedText) {
    process.stdout.write(char);
    await delay(ms); // 각 글자 출력 후 대기
  }
  console.log(); // 줄 바꿈
}
function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

//#endregion

//#region 유틸
// Random 값 범위
function GetRandomRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// Percentage 확률
function RandomChance(percentage) {
  let result = percentage * 0.01;
  return Math.random() < result;
}
//#endregion

//#region Json 파일관리
//#region 파일 정보 가져오기
import fsp from "fs/promises"; // fs/promises에서 fs를 가져옵니다.
import fs from "fs"; // fs 모듈을 가져옵니다.

// JSON 파일을 로드하는 함수
async function loadJson(filePath) {
  try {
    const data = await fsp.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    // 데이터 사용
    //console.log(jsonData);
    //console.log(`ShopText: ${jsonData.ShopText[0]}`);
    return jsonData;
  } catch (err) {
    console.error("파일 읽기 오류:", err);
  }
}

// JSON 파일을 저장하는 함수
function saveJson(filePath, jsonData) {
  // JSON 객체를 문자열로 변환
  const jsonString = JSON.stringify(jsonData, null, 2); // 가독성을 위해 들여쓰기 추가

  try {
    // 파일에 쓰기
    fs.writeFileSync(filePath, jsonString);
    console.log(`${filePath} 파일이 저장되었습니다.`);
  } catch (err) {
    console.error("파일 쓰기 오류:", err);
  }
}
/* 사용 예시
const jsonFilePath = 'TextTable.json'; // 로드할 JSON 파일 경로
const saveFilePath = 'data.json'; // 저장할 JSON 파일 경로

// JSON 로드
loadJson(jsonFilePath);

// JSON 데이터 예시 (저장할 데이터)
const jsonDataToSave = {
  name: "홍길동",
  age: 30,
  city: "서울",
};
// JSON 저장
saveJson(saveFilePath, jsonDataToSave);
*/
//#endregion

//#endregion

//#region 리펙토링
async function HandleChoice(
  options,
  messages,
  other = "올바르지 않은 선택입니다"
) {
  const choice = Input(ChoiceSlicer(messages));
  if (options[choice]) {
    await options[choice]();
  } else {
    await DisplayMessage(other);
  }
}
function ChoiceSlicer(choices) {
  return choices
    .split(",") // 콤마로 분리
    .map((choice, index) => `${index + 1}. ${choice.trim()}`) // 각 항목에 번호 추가 및 공백 제거
    .join("\n"); // 줄바꿈으로 연결
}
async function DisplayMessage(message) {
  await typeEffect(message);
}

//#endregion

//#region 프롤로그
const playerDataFile = "PlayerData.json"; // 로드할 JSON 파일 경로
//const saveFilePath = 'data.json'; // 저장할 JSON 파일 경로

// JSON 로드
let playerData;
let isPrologue = true;

async function Prologue() {
  if (isPrologue === false) return;
  isPrologue = false;
  playerData = await loadJson(playerDataFile);
  console.log(playerData);
  await typeEffect(playerData.Player[0].Story);
  Input("다음으로 넘어가기");
}
//#endregion

//#region 마을
// 마을
async function Town() {
  // 상점 치료소 던전 중 어디로 가시겠습니까?
  await typeEffect(
    `
        현재 위치는 마을입니다.
        `
  );

  const choice = Input(
    `
        1. 상점
        2. 치료소
        3. 던전
        옵션을 선택해 주세요:
        `
  );

  switch (choice) {
    case "1":
      await typeEffect(
        `
        상점으로 이동중입니다.
        `
      );
      await Shop();
      break;
    case "2":
      await typeEffect(
        `
        치료소로 이동중입니다.
        `
      );
      await healingCenter();
      break;
    default:
      await typeEffect(
        `
        던전으로 이동중입니다.
        `
      );
      await Dungeon();
      break;
  }
}

//상점
async function Shop() {
  // 때껄룩
  const options = {
    1: () => Shop_Bye(),
    2: () => Shop_Sell(),
    3: () => Town(),
  };
  await typeEffect(
    `
    상점에 들어왔습니다.
    물품을 파는 상인은 친절하게 안쪽으로 안내합니다.
    상인 : "어서오세요!!"
    당신이 안쪽으로 들어오자 치료사의 눈빛이 변합니다!
    상인 : "어떤 일로 오셨습니까?!"
    `
  );

  await HandleChoice(options, "구매,판매,나가기");
}

async function Shop_Bye() {
  await typeEffect(
    `
오늘의 상품은 무려 특가!!!
`
  );
  const choice = Input(
    `
    1. 포션 구매
    2. 나가기
    `
  );
}

async function Shop_Sell() {
  await typeEffect(
    `
필요 없는 물건이라면 여기 다 내려놓고 가세요!!
                `
  );
  const choice = Input(
    `
    1. 판매
    2. 나가기
    `
  );
}

//치료소
const healPrice = 150;
async function healingCenter() {
  await typeEffect(
    `
        치료소에 들어왔습니다.
        환자를 치료중이던 치료사는 친절하게 안쪽으로 안내합니다.
        치료사 : "어서오세요!!"
        당신이 안쪽으로 들어오자 치료사의 눈빛이 변합니다!
        치료사 : "돈은 충분히 가지고 오셨겠죠?"
        `
  );

  const choice = Input(`
            1. 치료를 받는다. 필요 골드 ${healPrice}G
            2. 치료소를 나간다.
            옵션을 선택해 주세요:`);

  switch (choice) {
    case "1":
      if (gold >= healPrice) {
        gold -= healPrice;
        await typeEffect(
          `
                150G 를 소모했습니다.
                치료사 : 호랑이의 기운이 온다 온다! 왔다!!!!!!!!!!!!!!!
                `
        );
      } else {
        await typeEffect(
          `
            치료에 필요한 골드 ${healPrice}G 중 
            ${healPrice - gold}G 만큼 부족합니다.
            치료사 : "아닛!!! 무전 치료를 받을려는 
            괴씸한 환자가 있다구?!!!!"
            치료사에 의해 밖으로 쫓겨났습니다.
            쾅!
            `
        );
        await delay(500);
        await Town();
      }

      break;
    case "2":
      await typeEffect(
        `
            치료사 : 돈 많이 벌어오세요!!
            `
      );
      break;
    default:
      await typeEffect(
        `
                치료사 : 도대체 원하는게 뭐야?!
                `
      );
      break;
  }
}

//#endregion

//#region 던전
// 던전

async function Dungeon() {
  await typeEffect(`
        이곳은 던전 입구입니다.
        `);
  const choice = Input(
    `
        입장 하시겠습니까?
        1. 입장하기
        2. 나가기
        `
  );

  switch (choice) {
    case "1":
      await typeEffect(`
            던전 안으로 입장중 입니다.
            `);
      for (let index = 0; index < rooms.length; index++) {
        const target = rooms[index];
        if (target.rate) {
          target.room();
          return;
        }
      }
      break;
    case "2":
      await typeEffect(`
            던전에서 나가는 중입니다.
            `);
      await Town();
      break;
    default:
      break;
  }
}

//#region Room

// 이곳은 완전한 랜덤 방입니다.
// 다른 방으로 이동합니다.
const rooms = [
  { rate: 5, room: () => UnkownRoom() },
  { rate: 10, room: () => WarningRoom() },
  { rate: 10, room: () => TrapRoom() },
  { rate: 10, room: () => SpecialRoom() },
  { rate: 10, room: () => SafeRoom() },
  { rate: 100, room: () => NormalRoom() },
];
async function UnkownRoom() {
  await typeEffect(`
        알수없는 갈림길에 진입했습니다.
        발걸음은 도저히 멈춰지지 않습니다.
        `);
  rooms[GetRandomRange(0, rooms.length - 1)].room();
}
// 일반적인 몬스터가 등장하는 방입니다.
async function NormalRoom() {
  await typeEffect(`
        이곳은 일반적인 던전입니다.
        곧 몬스터가 등장합니다.
        `);
}
// 기습으로 인하여 적이 먼저 공격하는 방입니다.
async function WarningRoom() {
  await typeEffect(`
        이런 몬스터가 대기중이었군요
        바로 전투에 돌입합니다!
        `);
}

// 이곳은 어떠한 대가든 대가를 치뤄야 합니다.
async function TrapRoom() {
  await typeEffect(`
        함정입니다 어서 빠져나가야 합니다!
        `);
}
// 이곳은 이벤트가 열리는 방입니다.
async function SpecialRoom() {
  await typeEffect(`
        방 한 가온데 커다란 상자가 있습니다.
        `);
  const choice = Input(
    `
        열어 보시겠습니까?
        1. 열어보기
        2. 나가기
        `
  );
}
// 여기에서는 회복 및 강화를 할 수 있습니다.
async function SafeRoom() {
  await typeEffect(`
        이곳은 안전한 장소입니다.
        `);
  const choice = Input(
    `
        어떻게 하시겠습니까?
        1. 휴식하기
        2. 수련하기
        3. 나가기
        `
  );
}

//#endregion

//#region 몬스터
// 몬스터
async function Monster() {}

//#endregion

//#region  보스
// 보스
function Boss() {}

//#endregion

//#endregion

//#region  게임시작
// 게임 시작

async function Start() {
  await Prologue();
  await Town();
}

Start();

//#endregion

//#region 게임 설계도
/* 전체 설계 └ ,─ , │, ├
게임 시작 (Start) DataLoad
  └── 프롤로그 (Prologue)
  │    └── 마을 (Town)
  │        ├── 상점 (Shop)
  │        │   ├── 구매 (Shop_Bye)
  │        │   └── 판매 (Shop_Sell)
  │        ├── 치료소 (healingCenter)
  │        └── 던전 (Dungeon)
  │            ├── 방 선택 (rooms)
  │            │   ├── 일반 방 (NormalRoom)
  │            │   ├── 경고 방 (WarningRoom)
  │            │   ├── 함정 방 (TrapRoom)
  │            │   ├── 특별 방 (SpecialRoom)
  │            │   └── 안전 방 (SafeRoom) [마을]
  └────────────└── 사망(Data Save)
*/

//마을을 제거하고

//프롤로그 이후 바로 던전으로
//던전에서 선택지 최대 5종
//최소 1종

/* 전체 설계 └ ,─ , │, ├
게임 시작 (Start) DataLoad
  └── 프롤로그 (Prologue)
  │        └── 던전 (Dungeon)[Floor]
  │            ├── 방 선택 (rooms)
  │            │   ├── 일반 방 (NormalRoom)
  │            │   ├── 경고 방 (WarningRoom)
  │            │   ├── 함정 방 (TrapRoom)
  │            │   ├── 특별 방 (SpecialRoom)
  │            │   └── 안전 방 (SafeRoom)
  └────────────└── 사망(Data Save)
*/

// 수정 하려 하는 방향

//#endregion
