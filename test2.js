import { Unit } from "./src/class/unit.js";
import { titleArt } from "./src/data/title.js";
import { getEnter, getUserChoice, getUserName } from "./src/utils/input.js";
import { LogEffect } from "./src/utils/log.js";
import { LogManager } from "./src/utils/logmanager.js";
import { getRandomRange } from "./src/utils/random.js";

const logManager = new LogManager(); // 로그 매니저 인스턴스 생성
const player = new Unit("player", 10, 100, 1, 1);

const mainSceneLog = logManager.createLog("게임시작");

const nameSceneLog = logManager.createLog("이름입력");
const trainingSceneLog = logManager.createLog("훈련소");
const librarySceneLog = logManager.createLog("도서관");
const classSceneLog = logManager.createLog("교실");

let day = 1;

//battleLog.add(titleArt);
LogEffect(titleArt);

const choiceTitle = {
  "게임 시작": nameScene,
  "업적 확인": () => {},
  "게임 종료": () => {
    LogEffect("게임 을 종료 합니다.");
    process.exit(0); // 프로그램 종료
  },
};
getUserChoice(choiceTitle);

const choiceGame = {
  "훈련 장소로 이동하기": trainingScene,
  "마법 교실로 이동하기": classScene,
  "도서관 으로 이동하기": libraryScene,
  "학업을 포기하기": () => {
    LogEffect("게임 을 종료 합니다.");
    process.exit(0); // 프로그램 종료
  },
};
function Clear() {
  console.clear();
  console.log();
}
// 이름 씬을 처리하는 함수

async function nameScene() {
  Clear();
  nameSceneLog.clear();
  nameSceneLog.add("마법학교에 오신것을 환영합니다.");
  nameSceneLog.add(`이름을 입력해 주세요`);
  await nameSceneLog.display();
  player.name = await getUserName();
  await nameSuccess();
}
async function nameSuccess() {
  nameSceneLog.clear();
  nameSceneLog.add(`당신의 이름은 ${player.name} 입니다.`);
  await nameSceneLog.display();
  let temp = await getEnter();
  await mainScene(); // 메인 씬으로 전환
}

function mainScene() {
  Clear();
  mainSceneLog.clear();
  mainSceneLog.add(`환영합니다 ${player.name} 님`);
  mainSceneLog.add(`마법 학교의 중앙홀입니다.`);
  mainSceneLog.add(`${day} 번째 날입니다.`);
  mainSceneLog.add(`4 번째 날마다 죽음이 찾아옵니다.`);
  player.status(mainSceneLog);
  mainSceneLog.display(() => getUserChoice(choiceGame));
  day++;
}

async function trainingScene() {
  Clear();
  trainingSceneLog.clear();
  trainingSceneLog.add("훈련소에 도착했습니다.");
  trainingSceneLog.add("힘이 강해 져요!!");
  trainingSceneLog.add("체력이 증가 합니다!!");
  const strength = await addpower();
  trainingSceneLog.add(`힘이${strength} 만큼 증가했습니다.`);
  await trainingSceneLog.display();
  let name = await getEnter();
  await mainScene();
}
async function classScene() {
  Clear();
  classSceneLog.clear();
  classSceneLog.add("교실에 도착 했습니다.");
  await classSceneLog.display();
  let name = await getEnter();

  mainScene();
}

async function libraryScene() {
  Clear();
  librarySceneLog.clear();
  librarySceneLog.add("도서관에 도착 했습니다.");

  await librarySceneLog.display();

  let name = await getEnter();
  mainScene();
}

function addpower() {
  const value = getRandomRange(0, 5);
  player.stats.힘 = value;
  return value;
}

function addintelligence() {
  const value = getRandomRange(0, 5);
  player.stats.지 = value;
  return value;
}

function addAgillity() {
  const value = getRandomRange(0, 5);
  player.stats.민 = value;
  return value;
}
