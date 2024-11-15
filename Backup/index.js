const readline = require("readline");

// 게임 상태를 관리하는 클래스
class Game {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.map = [];
    this.playerX = 1;
    this.playerY = 1;
    this.health = 100;
    this.score = 0;
    this.monsters = [];
    this.items = [];

    // 입력 처리를 위한 readline 인터페이스
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // 맵 초기화
  initializeMap() {
    for (let y = 0; y < this.height; y++) {
      this.map[y] = [];
      for (let x = 0; x < this.width; x++) {
        if (
          y === 0 ||
          y === this.height - 1 ||
          x === 0 ||
          x === this.width - 1
        ) {
          this.map[y][x] = "#"; // 벽
        } else {
          this.map[y][x] = "."; // 빈 공간
        }
      }
    }

    // 몬스터 배치
    for (let i = 0; i < 3; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * (this.width - 2)) + 1;
        y = Math.floor(Math.random() * (this.height - 2)) + 1;
      } while (this.map[y][x] !== ".");
      this.monsters.push({ x, y });
      this.map[y][x] = "M";
    }

    // 아이템 배치
    for (let i = 0; i < 2; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * (this.width - 2)) + 1;
        y = Math.floor(Math.random() * (this.height - 2)) + 1;
      } while (this.map[y][x] !== ".");
      this.items.push({ x, y, type: "health" });
      this.map[y][x] = "+";
    }

    // 플레이어 위치 설정
    this.map[this.playerY][this.playerX] = "@";
  }

  // 게임 상태 출력
  render() {
    console.clear();
    console.log("Health:", this.health, "Score:", this.score);
    console.log("Commands: w(위), s(아래), a(왼쪽), d(오른쪽), q(종료)");
    this.map.forEach((row) => console.log(row.join("")));
  }

  // 몬스터 이동
  moveMonsters() {
    this.monsters.forEach((monster) => {
      // 이전 위치 지우기
      this.map[monster.y][monster.x] = ".";

      // 랜덤 이동
      const directions = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ];
      const dir = directions[Math.floor(Math.random() * directions.length)];

      const newX = monster.x + dir.x;
      const newY = monster.y + dir.y;

      // 벽이나 다른 물체와 충돌하지 않으면 이동
      if (this.map[newY][newX] === ".") {
        monster.x = newX;
        monster.y = newY;
      }

      // 새 위치에 몬스터 표시
      this.map[monster.y][monster.x] = "M";
    });
  }

  // 플레이어 이동 처리
  move(direction) {
    let newX = this.playerX;
    let newY = this.playerY;

    switch (direction) {
      case "w":
        newY--;
        break;
      case "s":
        newY++;
        break;
      case "a":
        newX--;
        break;
      case "d":
        newX++;
        break;
    }

    // 벽과의 충돌 체크
    if (this.map[newY][newX] === "#") return;

    // 몬스터와의 충돌 체크
    if (this.map[newY][newX] === "M") {
      this.health -= 20;
      this.score += 10;
      this.monsters = this.monsters.filter((m) => m.x !== newX || m.y !== newY);
    }

    // 아이템 획득
    if (this.map[newY][newX] === "+") {
      this.health += 20;
      this.items = this.items.filter((i) => i.x !== newX || i.y !== newY);
    }

    // 이전 위치 지우기
    this.map[this.playerY][this.playerX] = ".";

    // 새 위치로 이동
    this.playerX = newX;
    this.playerY = newY;
    this.map[this.playerY][this.playerX] = "@";

    // 몬스터 이동
    this.moveMonsters();
  }

  // 게임 상태 체크
  checkGameState() {
    if (this.health <= 0) {
      console.log("게임 오버! 최종 점수:", this.score);
      return false;
    }
    if (this.monsters.length === 0) {
      console.log("승리! 최종 점수:", this.score);
      return false;
    }
    return true;
  }

  // 게임 실행
  async start() {
    this.initializeMap();
    this.render();

    while (true) {
      const input = await new Promise((resolve) => {
        this.rl.question("행동을 선택하세요: ", (answer) => {
          resolve(answer.toLowerCase());
        });
      });

      if (input === "q") {
        console.log("게임을 종료합니다.");
        break;
      }

      if (["w", "a", "s", "d"].includes(input)) {
        this.move(input);
        this.render();

        if (!this.checkGameState()) {
          break;
        }
      }
    }

    this.rl.close();
  }
}

// 게임 시작
const game = new Game();
game.start();
