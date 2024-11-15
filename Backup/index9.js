//#region ColorFullText 색상 글자!

import chalk from "chalk";
function Blue(str) {
  //chalk.blue('이것은 파란색입니다.')
  return chalk.blue(`${str}`);
}
function Red(str) {
  //chalk.red.bold('이것은 빨간색이며 굵은 글씨입니다.')
  return chalk.red.bold(`${str}`);
}
function Green(str) {
  //console.log(chalk.green.underline("이것은 초록색이며 밑줄이 있습니다."));
  return chalk.green.underline(`${str}`);
}

function Yellow(str) {
  //console.log(chalk.yellow.bgBlue("이것은 노란색 글씨에 파란색 배경입니다."));
  return chalk.yellow.bgBlue(`${str}`);
}

function Puple(str) {
  //chalk.magenta.bold.italic("이것은 자주색이며 굵고 기울임꼴입니다.")
  return chalk.magenta.bold.italic(`${str}`);
}

function Cyan(str) {
  //console.log(chalk.cyan("이것은 청록색입니다."));
  return chalk.cyan(`${str}`);
}

function BgRed(str) {
  //chalk.white.bgRed.bold("이것은 빨간색 배경에 흰색 글씨이며 굵습니다.")
  return chalk.bgRed.bold(`${str}`);
}

function Gray(str) {
  //console.log(chalk.gray("이것은 회색입니다."));
  return chalk.gray(`${str}`);
}

function GreenBright(str) {
  //console.log(chalk.greenBright("이것은 밝은 초록색입니다."));
  return chalk.greenBright(`${str}`);
}

function BgYellow(str) {
  //console.log(chalk.bgYellow.black("이것은 노란색 배경에 검은색 글씨입니다."));
  return chalk.bgYellow.black(`${str}`);
}

function DisplayHealthBar(currentHealth, maxHealth) {
  const healthPercentage = currentHealth / maxHealth;
  const totalBarLength = 30; // 전체 체력 바 길이
  const currentBarLength = Math.round(totalBarLength * healthPercentage);

  // 남은 체력과 깎인 체력 부분을 색상으로 구분
  const healthBar =
    chalk.green("█").repeat(currentBarLength) + // 남은 체력 (초록색)
    chalk.red("█").repeat(totalBarLength - currentBarLength); // 깎인 체력 (붉은색)

  console.log(`체력: [${healthBar}] ${currentHealth}/${maxHealth}`);
}

// 사용 예시
// const maxHealth = 100;
// let currentHealth = 75;

// // 체력 바 표시
// DisplayHealthBar(currentHealth, maxHealth);

// // 체력이 감소했을 때
// currentHealth = 50;
// DisplayHealthBar(currentHealth, maxHealth);

//#endregion

//#region Title

const titleText = `
▓█████▄  █    ██  ███▄    █   ▄████ ▓█████  ▒█████   ███▄    █ 
▒██▀ ██▌ ██  ▓██▒ ██ ▀█   █  ██▒ ▀█▒▓█   ▀ ▒██▒  ██▒ ██ ▀█   █ 
░██   █▌▓██  ▒██░▓██  ▀█ ██▒▒██░▄▄▄░▒███   ▒██░  ██▒▓██  ▀█ ██▒
░▓█▄   ▌▓▓█  ░██░▓██▒  ▐▌██▒░▓█  ██▓▒▓█  ▄ ▒██   ██░▓██▒  ▐▌██▒
░▒████▓ ▒▒█████▓ ▒██░   ▓██░░▒▓███▀▒░▒████▒░ ████▓▒░▒██░   ▓██░
 ▒▒▓  ▒ ░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒  ░▒   ▒ ░░ ▒░ ░░ ▒░▒░▒░ ░ ▒░   ▒ ▒ 
 ░ ▒  ▒ ░░▒░ ░ ░ ░ ░░   ░ ▒░  ░   ░  ░ ░  ░  ░ ▒ ▒░ ░ ░░   ░ ▒░
 ░ ░  ░  ░░░ ░ ░    ░   ░ ░ ░ ░   ░    ░   ░ ░ ░ ▒     ░   ░ ░ 
   ░       ░              ░       ░    ░  ░    ░ ░           ░ 
 ░                                                             
`;

//#endregion

//#region 꼬부랑 글자!
import figlet from "figlet";

//#endregion

//#region 입력
import readlineSync from "readline-sync";

//입력 타임!!!
function Input(str, color = Red) {
  str = str + "\n";
  return readlineSync.question(color(str));
}

//테스트

//#endregion

//#region 출력

async function TypeEffect(text, color = Red, ms = 50) {
  const formattedText = text.replace(".,", ".").replace(/([.,])\s*/g, "$1\n");
  console.clear();
  let colorIndex = 0;

  for (let char of formattedText) {
    process.stdout.write(color(char)); // 색상 적용 후 문자 출력
    colorIndex++;
    await Delay(ms); // 대기
  }
  console.log(); // 줄 바꿈
}
function Delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
function Clear() {
  console.clear();
}

//테스트

// const sampleText = "안녕하세요. 이것은 타입 효과입니다. 잘 보세요.";
// const color = Red; // 사용할 색상 배열

// typeEffect(sampleText, color, 100);

//#endregion

//#region 선택

async function HandleChoice(
  options,
  messages,
  other = "올바르지 않은 선택입니다",
  color = Yellow
) {
  const choice = Input(ChoiceSlicer(messages), color);
  if (options[choice]) {
    await options[choice](); // 비동기 함수 호출 시 await 사용
  } else {
    await DisplayMessage(other);
  }
}
async function EnterPlz(str, color = Green, ms = 50) {
  await Input("엔터를 눌러주세요");
}

function ChoiceSlicer(choices) {
  return choices
    .split(",") // 콤마로 분리
    .map((choice, index) => `${index + 1}. ${choice.trim()}`) // 각 항목에 번호 추가 및 공백 제거
    .join("\n"); // 줄바꿈으로 연결
}

async function DisplayMessage(message, color = Green, ms = 50) {
  if (ms <= 0) {
    console.log(color(message));
  } else await TypeEffect(message, color, ms);
}

// 선택지 처리
async function Select_1() {
  await DisplayMessage("선택 1 입니다."); // 비동기 처리
}

async function Select_2() {
  await DisplayMessage("선택 2 입니다."); // 비동기 처리
}

// 선택지 배열을 객체 형태로 수정
//HandleChoice({ 1: Select_1, 2: Select_2 }, "선택1,선택2", "잘못된 선택입니다.");

//EnterPlz("테스트 입니다.");
//#endregion

//#endregion

//#region 유틸
// Random 값 범위
function GetRandomRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// Percentage 확률
function GetRandomChance(percentage) {
  let result = percentage * 0.01;
  return Math.random() < result;
}

// 배열 셔플
function GetRandomChoices(arr, numChoices) {
  // 배열의 복사본을 생성하여 원본 배열을 보호합니다.
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numChoices); // 랜덤하게 선택한 요소 반환
}
//#endregion

//#region Json 파일관리
import fsp from "fs/promises"; // fs/promises에서 fs를 가져옵니다.
import fs from "fs"; // fs 모듈을 가져옵니다.
import { clear, Console } from "console";

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

//#endregion

//#region Scene 콘텐츠
async function TitleScene() {
  Clear();
  await DisplayMessage(titleText, Green, 0);

  const options = { 1: GameScene, 2: Select_2 };
  await HandleChoice(options, "게임시작,업적확인,게임종료");
}

TitleScene();
const introText =
  "당신은 모든것을 잃었습니다, 기억/ 두려움/ 배고픔까지, 지금은 오로지 이 장소를 벗어나야 한다는 생각으로 가득차기 시작합니다.";
async function GameScene() {
  Clear();
  await DisplayMessage(introText);
  let selector = await SelectLocation();
  await HandleChoice(
    { 1: selector[0], 2: selector[1], 3: selector[2] },
    `${selector[0].name},${selector[1].name},${selector[2].name}`
  );
}

async function SceneSellector() {
  await DisplayMessage("이동할 장소를 선택해 주세요");
  let selector = await SelectLocation();
  await HandleChoice(
    { 1: selector[0], 2: selector[1], 3: selector[2] },
    `${selector[0].name},${selector[1].name},${selector[2].name}`
  );
}

async function SelectLocation() {
  const list = [ChestRoom, Room_2, Room_3, Room_4, Room_5];
  const rand = GetRandomChoices(list, 3);
  return rand;
}
const boxText = `
          .-""""""-.
        .'          '.
       /   _      _   \\
      /   | |    | |   \\
     /    | |____| |    \\
    /     |  $$$$  |     \\
   /      |  $$$$  |      \\
  /       |  $$$$  |       \\
 |        |  $$$$  |        |
 |        |  $$$$  |        |
 |        |  $$$$  |        |
 |        |  $$$$  |        |
 |       .'--------'.       |
 |      /            \\      |
 |     /              \\     |
  \\   /                \\   /
   \\ /                  \\ /
    '------------------'`;
async function ChestRoom() {
  Clear();
  const roomText =
    "어두 컴컴한 동굴 구석에서 영롱하게 빛이나는 상자를 발견했습니다.";
  await DisplayMessage(roomText);
  await DisplayMessage(boxText, Red, 0);
  await HandleChoice(
    { 1: ChestOpenRoom, 2: SceneSellector },
    "보물 상자를 연다.,나가기"
  );
}
const openBoxText = `
         .-""""""-.
        .'          '.
       /              \\
      /                \\
     /   .-""""""-.     \\
    /   /          \     \\
   |   |  $$$$$$   |      |
   |   |  $$$$$$   |      |
   |   |  $$$$$$   |      |
   |   |  $$$$$$   |      |
    \\   \\          /     /
     \\   '-......-'     /
      '.              .'
        '-._______.-'
`;
async function ChestOpenRoom() {
  const item = ["", "", "", ""];
  const selectItem = GetRandomChoices(item, 1);
  await DisplayMessage(openBoxText, Red, 0);
  await DisplayMessage(`상자에서 ${selectItem}이 나왔습니다.`);
  HandleChoice({ 1: SceneSellector }, "나가기");
}
async function Room_2() {
  Clear();
  const roomText =
    "조심스럽게 이동을 하던중, 괴성을 지르며 몬스터가 나타났습니다.";
  DisplayMessage(roomText);
}
async function Room_3() {
  Clear();
  const roomText =
    "끔찍한 환청과 함께 적이 서서히 뚜렷해지기 시작합니다,마치 처음부터 기다리고 있었다는듯이,눈빛은 이곳을 응시하고 있습니다.";
  DisplayMessage(roomText);
}
async function Room_4() {
  Clear();
  const roomText =
    "이곳은 아무것도 없이 텅텅 비어있습니다. 하지만 기운이 회복되는듯이 몸이 가볍습니다.";
  await DisplayMessage(roomText);
  await DisplayHealthBar(100, 90);
}
const bossText = `
                    __====-_  _-====__
                  _--^^^#####//      \\\\#####^^^--_
               _-^##########// (    ) \\\\##########^-_
              -############//  |\^^/|  \\\\############-
            _/############//   (@::@)   \\\\############\\_
           /#############((      \\\//      ))#############\\
          -###############\\\\     (oo)     //###############-
         -#################\\\\   / "" \\   //#################-
        -###################\\\\  \\_____/  //###################-
       -#####################\\\\_________/#####################-
      -#######################\\\\_____//#######################-
     -#########################\\\\___//#########################-
`;
async function Room_5() {
  Clear();
  const roomText =
    "던전과 이어진듯한 육체는 호흡마저 잊어버릴 정도로, 온몸을 찌르는듯한 살기를 흩날립니다.이곳의 시작이자 마지막을 알리는 최종보스가 틀림없습니다.";
  await DisplayMessage(roomText);
  await DisplayMessage(bossText, Red, 0);
  await DisplayHealthBar(500, 500);
}

//#endregion
