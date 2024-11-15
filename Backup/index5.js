const readline = require("readline");
const chalk = require("chalk");

// 맵 크기
const mapWidth = 20;
const mapHeight = 10;

// 플레이어와 게임 객체
let player = { x: 0, y: 0, hp: 15, attack: 3 };
let enemies = [];
let items = [];

// readline 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 적과 아이템 배치
function spawnEntities() {
  for (let i = 0; i < 7; i++) {
    enemies.push({
      x: Math.floor(Math.random() * mapWidth),
      y: Math.floor(Math.random() * mapHeight),
      hp: 5 + Math.floor(Math.random() * 5),
      attack: 2,
    });
  }
  for (let i = 0; i < 5; i++) {
    items.push({
      x: Math.floor(Math.random() * mapWidth),
      y: Math.floor(Math.random() * mapHeight),
      type: Math.random() < 0.5 ? "potion" : "gold",
    });
  }
}

// 맵 생성
function generateMap() {
  const map = [];
  for (let y = 0; y < mapHeight; y++) {
    const row = [];
    for (let x = 0; x < mapWidth; x++) {
      if (x === player.x && y === player.y) {
        row.push(chalk.blue("P")); // 플레이어
      } else if (enemies.some((e) => e.x === x && e.y === y)) {
        row.push(chalk.red("E")); // 적
      } else if (
        items.some((i) => i.x === x && i.y === y && i.type === "potion")
      ) {
        row.push(chalk.green("H")); // 체력 포션
      } else if (
        items.some((i) => i.x === x && i.y === y && i.type === "gold")
      ) {
        row.push(chalk.yellow("G")); // 골드
      } else {
        row.push(chalk.gray("."));
      }
    }
    map.push(row);
  }
  return map;
}

// 맵 출력
function renderMap() {
  const map = generateMap();
  console.clear();
  console.log(chalk.bold.yellow("===== CLI 로그라이크 던전 ====="));
  map.forEach((row) => console.log(row.join(" ")));
  console.log(
    chalk.bold(`\n플레이어 HP: ${player.hp}, 공격력: ${player.attack}`)
  );
  console.log("명령어: W(위) A(왼쪽) S(아래) D(오른쪽) Q(종료)");
}

// 전투 처리
function battle(enemy) {
  console.log(chalk.red("적을 만났습니다! 전투를 시작합니다."));
  while (player.hp > 0 && enemy.hp > 0) {
    enemy.hp -= player.attack;
    player.hp -= enemy.attack;
    console.log(
      chalk.cyan(`플레이어가 적을 공격! 적 HP: ${enemy.hp <= 0 ? 0 : enemy.hp}`)
    );
    console.log(
      chalk.red(`적이 반격! 플레이어 HP: ${player.hp <= 0 ? 0 : player.hp}`)
    );
  }
  if (player.hp <= 0) {
    console.log(chalk.red.bold("플레이어가 사망했습니다... 게임 오버"));
    rl.close();
    process.exit();
  } else {
    console.log(chalk.green("적을 처치했습니다!"));
    enemies = enemies.filter((e) => e !== enemy);
  }
}

// 아이템 획득
function collectItem(item) {
  if (item.type === "potion") {
    player.hp += 5;
    console.log(
      chalk.green(
        "포션을 획득하여 체력이 회복되었습니다! 현재 HP: " + player.hp
      )
    );
  } else if (item.type === "gold") {
    console.log(chalk.yellow("골드를 획득했습니다!"));
  }
  items = items.filter((i) => i !== item);
}

// 플레이어 이동
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
      console.log("W, A, S, D 중 하나를 입력하세요.");
      return;
  }
  checkEvents();
  renderMap();
  promptUser();
}

// 이벤트 처리
function checkEvents() {
  const enemy = enemies.find((e) => e.x === player.x && e.y === player.y);
  const item = items.find((i) => i.x === player.x && i.y === player.y);

  if (enemy) battle(enemy);
  if (item) collectItem(item);

  if (enemies.length === 0) {
    console.log(
      chalk.bold.green("모든 적을 처치했습니다! 던전을 정복했습니다!")
    );
    rl.close();
    process.exit();
  }
}

// 사용자 입력 대기
function promptUser() {
  rl.question("명령을 입력하세요: ", (input) => {
    if (input.toLowerCase() === "q") {
      console.log("게임을 종료합니다.");
      rl.close();
      process.exit();
    } else {
      movePlayer(input.toLowerCase());
    }
  });
}

// 게임 시작 함수
function startGame() {
  spawnEntities();
  renderMap();
  promptUser();
}

// 게임 시작
startGame();
