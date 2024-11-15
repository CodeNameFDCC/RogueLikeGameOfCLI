import * as log from "../log.js"; // .js 확장자 포함
import { Chance, range } from "../mymath.js";

/* 우선 플레이는 체력만 
-공격력 방어력 크리티컬 확률과 배율
-회피율 과 명중률
-명중률은 최소 데미지를 보정해주는 형태로 가자
-회피율은 데미지를 완전 회피 할 수있고 명중률 비례에 따라 감소한다.
-플레이어는 경험치와 레벨이 있고 이 레벨이 오를 때 마다 성장의 개념이 생긴다.
이건 몬스터에도 있을것이니 상속 한번 사용해보자
-아이템 요소도 들어가면 재미있을것 같다.
-아이템은 각 공 방 크리티컬 등을 보정해주는 형태
아이템 창은 6칸으로 신발만 6개 장착 가능
스킬개념인 연속공격 등의 추가 능력
*/

//게임의 플로우 ->

// 유닛의 공통 분모
class Unit {
  constructor(name, level, exp, nextexp, hp, def, atk, crtatk, crtrate) {
    this.name = name;
    this.level = level;
    this.exp = exp;
    this.nextexp = nextexp;
    this.hp = hp;
    this.def = def;
    this.atk = atk;
    this.crtatk = crtatk;
    this.crtrate = crtrate;
  }

  attack_normal(target) {
    let resultDmg = 0;
    const damage = Math.floor(range(5 + this.atk, 10 + this.atk)); // 5~25의 랜덤 데미지

    resultDmg = Chance(this.crtrate)
      ? damage
      : (resultDmg = damage + damage * this.crtatk);

    target.damagetaken(resultDmg);
    return `${this.name}는 ${target.name}에게 ${resultDmg}의 피해를 입혔습니다.`;
  }

  damagetaken(dmg) {
    const damagecalculate = dmg * (1 - this.def / (100 + this.def));
    this.hp -= ~~damagecalculate;
  }

  isAlive() {
    return this.hp > 0;
  }
  isDeath() {
    return this.hp <= 0;
  }
}
class Player extends Unit {
  constructor() {
    super("플레이어", 1, 0, 50, 500, 1, 10, 1, 10);
  }
  nxetlevel() {
    if (this.nextexp >= this.exp == false) return;
    this.nextexp *= 1.5;
    this.level++;
  }
}

/*
몬스터는 스테이지에 따라 성장이라는 요소가 있다.
몬스터에게도 레벨을 지정하여 레벨 비례 성장치를 만들어 보자
몬스터는 이름과 정보 등이 있으면 재미 있을것 같다.
*/
class Monster extends Unit {
  constructor(stage) {
    let exp = stage * 10;
    super("monster", 1, exp, 0, 100 + stage * 10, 1, 5, 1, 10); // 스테이지에 따라 체력 증가
  }
}

/*
반복 되는 형태의 코드는 함수화 해서 리펙토링 하자 
*/

// info 수정해야함
// info 내용은 체력 마나 공격력 방어력

// 인벤토리

// 전투중 아이템 사용은 소모품

//----------------스텟 정보 표시----------------
function displayStatus(stage, player, monster) {
  log.line();
  log.description(`| Stage: ${stage} |`);
  log.line();
  log.info(player);
  log.line();
  log.info(monster);
  log.line();
}

const options = ["공격한다.", "아무것도 하지않는다.", "도망간다."];
let logs = []; // 행동 기록을 저장할 배열
function optiondisplay() {
  log.line();
  for (let index = 0; index < options.length; index++) {
    log.manu(index + 1, options[index]);
  }
}
//------------------------전투---------------
const battle = async (stage) => {
  while (player.isAlive() && monster.isAlive()) {
    log.clear(); // 화면을 지움
    log.title("Battle".toUpperCase());
    displayStatus(stage, player, monster);

    // 이전 턴의 로그 출력
    logs.forEach((log) => console.log(log));
    logs = []; // 로그를 초기화하여 다음 턴에 이전 기록이 남지 않도록 함
    optiondisplay();
    sellector(log.input());
    log.delay(5);
    if (monster.isAlive()) {
      logs.push(monster.attack_normal(player)); // 몬스터 공격 결과를 로그에 추가
    } else {
      logs.push(`${monster.name} 을 잡으셨습니다!`);
    }
  }
  battleOver();
};

function battleOver() {
  if (player.isDeath()) {
    log.description("플레이어가 쓰러졌습니다. 게임 오버!");
  } else if (monster.isDeath()) {
    log.description("몬스터를 처치하였습니다! 스테이지 클리어!");
  }
}

function sellector(choice) {
  log.delay(5);
  switch (choice) {
    case "1":
      logs.push(player.attack_normal(monster)); // 공격 결과를 로그에 추가
      break;
    case "2":
      logs.push("아무것도 하지 않아 적의 찬스가 돌아왔습니다.");
      break;
    case "3":
      if (Math.random() > 0.5) {
        // 50% 확률로 도망 성공
        logs.push("도망에 성공하였습니다. 다음 스테이지로 이동합니다.");
        return; // 전투 종료
      } else {
        logs.push("도망에 실패하였습니다. 몬스터가 공격합니다!");
      }
      break;
    default:
      logs.push("잘못된 선택을 하셨습니다.");
      break;
  }
}
let player = new Player();
let monster = new Monster(1);
export async function startGame() {
  log.clear();
  player = new Player();
  let stage = 1;

  while (stage <= 10) {
    monster = new Monster(stage);
    await battle(stage);

    if (player.isDeath()) {
      break; // 게임 오버 시 종료
    }

    stage++;
  }

  if (player.isAlive()) {
    console.log(player.isAlive, player.hp);
    console.log(chalk.green("모든 스테이지를 클리어하였습니다! 축하합니다!"));
  }
}
