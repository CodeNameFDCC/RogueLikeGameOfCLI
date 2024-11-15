const readline = require("readline-sync");

const player = {
  name: "영웅",
  health: 100,
  attack: 10,
  level: 1,
  experience: 0,
  items: [],
};

const monsters = [
  { name: "슬라임", health: 30, attack: 3, experience: 10 },
  { name: "고블린", health: 50, attack: 5, experience: 20 },
  { name: "오우거", health: 80, attack: 8, experience: 30 },
];

function displayStatus() {
  console.log(`\n${player.name}의 체력: ${player.health}`);
  console.log(`레벨: ${player.level}, 경험치: ${player.experience}`);
  console.log(
    "아이템: ",
    player.items.length > 0 ? player.items.join(", ") : "없음"
  );
}

function playerAttack(monster) {
  console.log(`${player.name}이(가) ${monster.name}을(를) 공격합니다!`);
  monster.health -= player.attack;
}

function monsterAttack(monster) {
  console.log(`${monster.name}이(가) ${player.name}을(를) 공격합니다!`);
  player.health -= monster.attack;
}

function gainExperience(monster) {
  console.log(`${monster.name}을(를) 처치했습니다! 경험치를 얻었습니다.`);
  player.experience += monster.experience;
  levelUp();
}

function levelUp() {
  if (player.experience >= player.level * 30) {
    player.level++;
    player.attack += 5; // 레벨업 시 공격력 증가
    player.health += 20; // 레벨업 시 체력 증가
    player.experience = 0; // 경험치 초기화
    console.log(
      `${player.name}이(가) 레벨업했습니다! 현재 레벨: ${player.level}`
    );
  }
}

function useItem() {
  if (player.items.length === 0) {
    console.log("아이템이 없습니다!");
    return;
  }

  console.log("사용할 아이템을 선택하세요:");
  const index = readline.keyInSelect(player.items, "아이템 선택:");
  if (index >= 0) {
    const item = player.items[index];
    if (item === "체력 회복제") {
      player.health += 20;
      console.log(
        `${player.name}이(가) 체력을 회복했습니다! 현재 체력: ${player.health}`
      );
      player.items.splice(index, 1); // 사용한 아이템 제거
    }
  }
}

function gameLoop() {
  while (player.health > 0) {
    console.clear();
    let monster = JSON.parse(
      JSON.stringify(monsters[Math.floor(Math.random() * monsters.length)])
    );
    console.log(
      `\n새로운 몬스터가 나타났습니다! ${monster.name} (체력: ${monster.health})`
    );

    while (monster.health > 0 && player.health > 0) {
      console.clear();
      displayStatus();
      const action = readline.keyInSelect(
        ["공격", "아이템 사용", "도망치기"],
        "무엇을 하겠습니까?"
      );

      if (action === 0) {
        // 공격
        playerAttack(monster);
        if (monster.health > 0) {
          monsterAttack(monster);
        } else {
          gainExperience(monster);
        }
      } else if (action === 1) {
        // 아이템 사용
        useItem();
      } else if (action === 2) {
        // 도망치기
        console.log(`${player.name}이(가) 도망쳤습니다!`);
        break;
      } else {
        console.log("잘못된 선택입니다.");
      }
    }

    if (player.health <= 0) {
      console.log(`${player.name}이(가) 패배했습니다!`);
      break;
    }
  }
}

console.log("로그라이크 게임에 오신 것을 환영합니다!");
player.items.push("체력 회복제"); // 시작 시 아이템 추가
gameLoop();
