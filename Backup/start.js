import { startGame } from "./game.js";
import * as log from "./log.js"; // .js 확장자 포함

const options = [" 새로운 게임 시작", " 업적 확인하기", " 옵션", " 종료"];
function option() {
  for (let index = 0; index < options.length; index++) {
    log.manu(index + 1, options[index]);
  }
}
const gamedata = {
  title: "gagegage Game",
  description: "게임에 오신것을 환영합니다.",
  question: "옵션을 선택해 주세요.",
  subdescription: "1~4 사이의 수를 입력한 뒤 엔터를 누르세요.",
};
// 로비 화면을 출력하는 함수
function displayLobby() {
  log.clear();
  // 타이틀 텍스트
  log.title(gamedata.title);
  // 상단 경계선
  log.line();
  // 게임 이름
  log.description(gamedata.description);
  // 설명 텍스트
  log.question(gamedata.question);
  log.space();
  // 옵션들
  option();
  // 하단 경계선
  log.line();
  // 하단 설명
  log.subdescription(gamedata.subdescription);
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput() {
  const choice = log.input();
  switch (choice) {
    case "1":
      log.text("게임을 시작합니다.");
      startGame();
      break;
    case "2":
      log.text("구현 준비중입니다.. 게임을 시작하세요");
      handleUserInput();
      break;
    case "3":
      log.text("구현 준비중입니다.. 게임을 시작하세요");
      handleUserInput();
      break;
    case "4":
      log.text("게임을 종료합니다.");
      process.exit(0); // 게임 종료
      break;
    default:
      log.text("올바른 선택을 하세요.");
      handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
  }
}

// 게임 시작 함수
function start() {
  displayLobby();
  handleUserInput();
}

// 게임 실행
start();
