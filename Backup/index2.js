const readline = require("readline");

// 맵 크기 설정
const mapWidth = 10;
const mapHeight = 10;

// 게임 상태 변수
let player = { x: 0, y: 0, hp: 10 };
let enemies = [];
let items = [];

// readline 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 적과 아이템 배치 함수
function spawnEntities() {
  // 적 배치
  for (let i = 0; i < 5; i++) {
    enemies.push({
      x: Math.floor(Math.random() * mapWidth),
      y: Math.floor(Math.random() * mapHeight),
      hp: 5,
    });
  }
  // 아이템 배치
  for (let i = 0; i < 3; i++) {
    items.push({
      x: Math.floor(Math.random() * mapWidth),
      y: Math.floor(Math.random() * mapHeight),
    });
  }
}

// 맵 생성 함수
function generateMap() {
  const map = [];
  for (let y = 0; y < mapHeight; y++) {
    const row = [];
    for (let x = 0; x < mapWidth; x++) {
      if (x === player.x && y === player.y) {
        row.push("P"); // 플레이어
      } else if (enemies.some((e) => e.x === x && e.y === y)) {
        row.push("E"); // 적
      } else if (items.some((i) => i.x === x && i.y === y)) {
        row.push("I"); // 아이템
      } else {
        row.push("."); // 빈 공간
      }
    }
    map.push(row);
  }
  return map;
}

// 맵 출력 함수
function renderMap() {
  const map = generateMap();
  console.clear();
  console.log("간단한 CLI 로그라이크 게임");
  map.forEach((row) => console.log(row.join(" ")));
  console.log(`\n플레이어 HP: ${player.hp}`);
  console.log("명령어: W(위) A(왼쪽) S(아래) D(오른쪽) Q(종료)");
}

// 플레이어 이동 함수
function movePlayer(direction) {
  switch (direction) {
    case "w":
      if (player.y > 0) player.y--;
      break;
    case "s":
      if (player.y < mapHeight - 1) player.y++;
      break;
    case "a":
      if (player.x > 0) player.x--;
      break;
    case "d":
      if (player.x < mapWidth - 1) player.x++;
      break;
    default:
      console.log("잘못된 입력입니다. W, A, S, D 중 하나를 입력하세요.");
      return;
  }
  checkEvents();
  renderMap();
  promptUser();
}

// 적과 아이템 상호작용 함수
function checkEvents() {
  // 적과의 전투
  const enemy = enemies.find((e) => e.x === player.x && e.y === player.y);
  if (enemy) {
    console.log("적을 만났습니다! 전투를 시작합니다.");
    while (player.hp > 0 && enemy.hp > 0) {
      enemy.hp -= 2;
      player.hp -= 1;
      console.log(
        `플레이어가 적에게 공격! 적 HP: ${enemy.hp}, 플레이어 HP: ${player.hp}`
      );
    }
    if (player.hp <= 0) {
      console.log("플레이어가 패배했습니다. 게임 오버.");
      rl.close();
    } else {
      console.log("적을 처치했습니다!");
      enemies = enemies.filter((e) => e !== enemy);
    }
  }
  // 아이템 획득
  const item = items.find((i) => i.x === player.x && i.y === player.y);
  if (item) {
    player.hp += 3;
    console.log("아이템을 발견하여 HP가 회복되었습니다! 현재 HP:", player.hp);
    items = items.filter((i) => i !== item);
  }
  // 게임 승리 조건 확인
  if (enemies.length === 0) {
    console.log("모든 적을 처치했습니다! 승리!");
    rl.close();
  }
}

// 사용자 입력 처리 함수
function promptUser() {
  rl.question("명령을 입력하세요: ", (input) => {
    if (input.toLowerCase() === "q") {
      console.log("게임을 종료합니다.");
      rl.close();
    } else {
      movePlayer(input.toLowerCase());
    }
  });
}

// 게임 초기화 함수
function startGame() {
  spawnEntities();
  renderMap();
  promptUser();
}

// 게임 시작
startGame();
