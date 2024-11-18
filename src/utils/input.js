import readlineSync from "readline-sync";
import { LogEffect } from "./log.js";

// 선택지를 보여주고 사용자의 선택을 받는 함수
export function getUserChoice(options) {
  LogEffect("\n다음 중 하나를 선택하세요:");
  let optionKeys = Object.keys(options); // 선택지의 키를 배열로 가져옴

  // 선택지 출력
  optionKeys.forEach((key, index) => {
    LogEffect(`${index + 1}. ${key}`);
  });

  const choice = readlineSync.question("선택: ");

  // 선택지 유효성 검사
  const choiceIndex = parseInt(choice) - 1;
  if (choiceIndex >= 0 && choiceIndex < optionKeys.length) {
    const selectedOption = optionKeys[choiceIndex];

    // 선택된 옵션이 함수인지 확인
    if (typeof options[selectedOption] === "function") {
      options[selectedOption](); // 선택된 옵션에 대한 결과 실행
    } else {
      LogEffect("잘못된 선택 입니다. 다시 시도하세요.");
      getUserChoice(options); // 잘못된 선택 시 재귀 호출
    }
  } else {
    LogEffect("잘못된 선택 입니다. 다시 시도하세요.");
    getUserChoice(options); // 잘못된 선택 시 재귀 호출
  }
}

export async function getUserName(unit) {
  const choice = readlineSync.question("이름: ");
  return await choice;
}
export async function getEnter(unit) {
  const choice = readlineSync.question("Enter Key 를 눌러주세요: ");
  return await choice;
}
