import readline from "readline-sync";
const player = {
  name: "영웅",
  health: 100,
  attack: 10,
};

const monster = {
  name: "몬스터",
  health: 50,
  attack: 5,
};

function displayStatus() {
  console.log(`\n${player.name}의 체력: ${player.health}`);
  console.log(`${monster.name}의 체력: ${monster.health}\n`);
}

function playerAttack() {
  console.log(`${player.name}이(가) ${monster.name}을(를) 공격합니다!`);
  monster.health -= player.attack;
}

function monsterAttack() {
  console.log(`${monster.name}이(가) ${player.name}을(를) 공격합니다!`);
  player.health -= monster.attack;
}

function gameLoop() {
  while (player.health > 0 && monster.health > 0) {
    displayStatus();
    const action = readline.keyInSelect(
      ["공격", "도망치기"],
      "무엇을 하겠습니까?"
    );

    if (action === 0) {
      // 공격
      playerAttack();
      if (monster.health > 0) {
        monsterAttack();
      }
    } else if (action === 1) {
      // 도망치기
      console.log(`${player.name}이(가) 도망쳤습니다!`);
      break;
    } else {
      console.log("잘못된 선택입니다.");
    }
  }

  if (player.health <= 0) {
    console.log(`${player.name}이(가) 패배했습니다!`);
  } else if (monster.health <= 0) {
    console.log(`${monster.name}을(를) 처치했습니다!`);
  }
}

console.log("로그라이크 게임에 오신 것을 환영합니다!");
gameLoop();
