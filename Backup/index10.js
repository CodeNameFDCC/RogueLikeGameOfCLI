//#region ColorFullText 색상 글자!
import chalk from "chalk";

function Blue(str) {
  return chalk.blue(`${str}`);
}

function Red(str) {
  return chalk.red.bold(`${str}`);
}

function Green(str) {
  return chalk.green.underline(`${str}`);
}

function Yellow(str) {
  return chalk.yellow.bgBlue(`${str}`);
}

function Purple(str) {
  return chalk.magenta.bold.italic(`${str}`);
}

function Cyan(str) {
  return chalk.cyan(`${str}`);
}

function BgRed(str) {
  return chalk.bgRed.bold(`${str}`);
}

function Gray(str) {
  return chalk.gray(`${str}`);
}

function GreenBright(str) {
  return chalk.greenBright(`${str}`);
}

function BgYellow(str) {
  return chalk.bgYellow.black(`${str}`);
}

function DisplayHealthBar(currentHealth, maxHealth) {
  const healthPercentage = currentHealth / maxHealth;
  const totalBarLength = 30;
  const currentBarLength = Math.round(totalBarLength * healthPercentage);

  const healthBar =
    chalk.green("█").repeat(currentBarLength) +
    chalk.red("█").repeat(totalBarLength - currentBarLength);

  console.log(`체력: [${healthBar}] ${currentHealth}/${maxHealth}`);
}
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

function Input(str, color = Red) {
  return readlineSync.question(color(`${str}\n`));
}
//#endregion

//#region 출력
async function TypeEffect(text, color = Red, ms = 50) {
  const formattedText = text.replace(".,", ".").replace(/([.,])\s*/g, "$1\n");
  console.clear();

  for (let char of formattedText) {
    process.stdout.write(color(char));
    await Delay(ms);
  }
  console.log();
}

function Delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function Clear() {
  console.clear();
}
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
    await options[choice]();
  } else {
    await DisplayMessage(other);
  }
}

async function EnterPlz(str, color = Green, ms = 50) {
  await Input("엔터를 눌러주세요");
}

function ChoiceSlicer(choices) {
  return choices
    .split(",")
    .map((choice, index) => `${index + 1}. ${choice.trim()}`)
    .join("\n");
}

async function DisplayMessage(message, color = Green, ms = 50) {
  if (ms <= 0) {
    console.log(color(message));
  } else await TypeEffect(message, color, ms);
}

// 선택지 처리
async function Select_1() {
  await DisplayMessage("선택 1 입니다.");
}

async function Select_2() {
  await DisplayMessage("선택 2 입니다.");
}
//#endregion

//#region 유틸
function GetRandomRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function GetRandomChance(percentage) {
  return Math.random() < percentage * 0.01;
}

function GetRandomChoices(arr, numChoices) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numChoices);
}
//#endregion

//#region Json 파일관리
import fsp from "fs/promises";
import fs from "fs";

async function loadJson(filePath) {
  try {
    const data = await fsp.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("파일 읽기 오류:", err);
  }
}

function saveJson(filePath, jsonData) {
  const jsonString = JSON.stringify(jsonData, null, 2);
  try {
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

async function SceneSelector() {
  await DisplayMessage("이동할 장소를 선택해 주세요");
  let selector = await SelectLocation();
  await HandleChoice(
    { 1: selector[0], 2: selector[1], 3: selector[2] },
    `${selector[0].name},${selector[1].name},${selector[2].name}`
  );
}

async function SelectLocation() {
  const list = [ChestRoom, Room_2, Room_3, Room_4, Room_5];
  return GetRandomChoices(list, 3);
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
    { 1: ChestOpenRoom, 2: SceneSelector },
    "보물 상자를 연다.,나가기"
  );
}
