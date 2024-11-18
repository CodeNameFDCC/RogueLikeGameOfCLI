import { LogEffect } from "../utils/log.js";
import { LogManager } from "../utils/logmanager.js";

// 선택지와 결과를 정의하는 객체
export const choicetest = {
  "전투 시작": () => LogEffect("전투 를 시작 합니다..."),
  "상태 확인": () => LogEffect("상태 를 확인 합니다..."),
  "게임 종료": () => {
    LogEffect("게임 을 종료 합니다.");
    process.exit(0); // 프로그램 종료
  },
};
export const choiceTitle = {
  "게임 시작": () => {},
  "업적 확인": () => {},
  "게임 종료": () => {
    LogEffect("게임 을 종료 합니다.");
    process.exit(0); // 프로그램 종료
  },
};
