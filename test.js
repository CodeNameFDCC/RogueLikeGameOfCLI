import { Unit } from "./src/class/unit.js";
import { choicetest } from "./src/data/choices.js";
import { getUserChoice } from "./src/utils/input.js";
import { LogManager } from "./src/utils/logmanager.js";

const logManager = new LogManager(); // 로그 매니저 인스턴스 생성
const battleLog = logManager.createLog("전투 로그"); // '전사 로그'라는 이름의 로그 생성

const unit1 = new Unit("전사", 15, 100, 5, 1);
const unit2 = new Unit("마법사", 10, 80, 3, 1);

const next = () => getUserChoice(choicetest);

// 전투 예시
unit1.attackOpponent(unit2, battleLog);
unit2.attackOpponent(unit1, battleLog);

// 레벨업 예시
unit1.levelUp(battleLog);
unit2.levelUp(battleLog);

// 상태 출력
unit1.status(battleLog);
unit2.status(battleLog);

// 각 유닛의 로그 출력
console.clear();

// 전체 로그 출력
logManager.getLog("전투 로그").display(next);
