import readline from "readline";
// 게임 상태 관리
class GameState {
  constructor() {
    this.player = {
      name: "",
      level: 1,
      hp: 100,
      maxHp: 100,
      exp: 0,
      gold: 0,
      skills: [
        { name: "기본 공격", damage: 10, probability: 0.9 },
        { name: "강한 공격", damage: 20, probability: 0.7 },
        { name: "치명타", damage: 35, probability: 0.4 },
      ],
    };
    this.currentStage = 1;
    this.gameOver = false;
  }
}

// 몬스터 클래스
class Monster {
  constructor(level) {
    const types = [
      { name: "슬라임", baseHp: 30, baseDamage: 5 },
      { name: "고블린", baseHp: 45, baseDamage: 8 },
      { name: "오크", baseHp: 60, baseDamage: 12 },
    ];

    const type = types[Math.floor(Math.random() * types.length)];
    this.name = type.name;
    this.hp = type.baseHp + level * 5;
    this.maxHp = this.hp;
    this.damage = type.baseDamage + level * 2;
  }
}

// 게임 매니저 클래스
class GameManager {
  constructor() {
    this.state = new GameState();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // 화면 클리어
  clearScreen() {
    console.clear();
  }

  // 게임 시작
  async start() {
    this.clearScreen();
    console.log("=== CLI 로그라이크 게임 ===\n");

    // 플레이어 이름 입력
    this.state.player.name = await this.question("영웅의 이름을 입력하세요: ");
    this.gameLoop();
  }

  // 메인 게임 루프
  async gameLoop() {
    while (!this.state.gameOver) {
      this.clearScreen();
      console.log(`\n=== ${this.state.currentStage}층 ===`);
      console.log(`${this.state.player.name} [Lv.${this.state.player.level}]`);
      console.log(`HP: ${this.state.player.hp}/${this.state.player.maxHp}`);
      console.log(`경험치: ${this.state.player.exp}`);
      console.log(`골드: ${this.state.player.gold}\n`);

      const choice = await this.question(
        "행동을 선택하세요:\n" +
          "1. 전투\n" +
          "2. 회복 (25 골드)\n" +
          "3. 게임 종료\n" +
          "선택: "
      );

      switch (choice) {
        case "1":
          await this.battle();
          break;
        case "2":
          this.heal();
          break;
        case "3":
          this.state.gameOver = true;
          break;
      }

      if (this.state.player.hp <= 0) {
        console.log("\n게임 오버! 영웅은 쓰러졌습니다...");
        this.state.gameOver = true;
      }
    }

    this.rl.close();
  }

  // 전투 시스템
  async battle() {
    const monster = new Monster(this.state.currentStage);
    console.log(`\n${monster.name}이(가) 나타났다!`);

    while (monster.hp > 0 && this.state.player.hp > 0) {
      console.log(`\n${monster.name} HP: ${monster.hp}/${monster.maxHp}`);
      console.log(
        `내 HP: ${this.state.player.hp}/${this.state.player.maxHp}\n`
      );

      // 스킬 선택
      console.log("사용할 스킬을 선택하세요:");
      this.state.player.skills.forEach((skill, index) => {
        console.log(
          `${index + 1}. ${skill.name} (데미지: ${skill.damage}, 성공확률: ${
            skill.probability * 100
          }%)`
        );
      });

      const skillChoice = await this.question("선택: ");
      const selectedSkill = this.state.player.skills[parseInt(skillChoice) - 1];

      // 플레이어 공격
      if (Math.random() <= selectedSkill.probability) {
        monster.hp -= selectedSkill.damage;
        console.log(
          `\n${selectedSkill.name} 성공! ${selectedSkill.damage}의 데미지를 입혔습니다.`
        );
      } else {
        console.log("\n스킬 사용에 실패했습니다!");
      }

      // 몬스터 공격
      if (monster.hp > 0) {
        this.state.player.hp -= monster.damage;
        console.log(
          `${monster.name}의 공격! ${monster.damage}의 데미지를 받았습니다.`
        );
      }

      await this.question("\n계속하려면 Enter를 누르세요...");
    }

    if (monster.hp <= 0) {
      const expGain = 10 * this.state.currentStage;
      const goldGain = 15 * this.state.currentStage;

      this.state.player.exp += expGain;
      this.state.player.gold += goldGain;

      console.log(`\n${monster.name}을(를) 물리쳤습니다!`);
      console.log(`경험치 +${expGain}`);
      console.log(`골드 +${goldGain}`);

      // 레벨업 체크
      if (this.state.player.exp >= this.state.player.level * 30) {
        this.levelUp();
      }

      this.state.currentStage++;
    }
  }

  // 레벨업 시스템
  levelUp() {
    this.state.player.level++;
    this.state.player.maxHp += 20;
    this.state.player.hp = this.state.player.maxHp;
    this.state.player.exp = 0;

    // 스킬 강화
    this.state.player.skills.forEach((skill) => {
      skill.damage += 5;
    });

    console.log("\n레벨 업!");
    console.log(`현재 레벨: ${this.state.player.level}`);
    console.log("모든 스킬의 데미지가 증가했습니다!");
  }

  // 회복 시스템
  heal() {
    if (this.state.player.gold >= 25) {
      this.state.player.gold -= 25;
      const healAmount = Math.floor(this.state.player.maxHp * 0.5);
      this.state.player.hp = Math.min(
        this.state.player.maxHp,
        this.state.player.hp + healAmount
      );
      console.log(`\n회복 완료! HP가 ${healAmount} 회복되었습니다.`);
    } else {
      console.log("\n골드가 부족합니다!");
    }
  }

  // 사용자 입력 처리
  question(query) {
    return new Promise((resolve) => this.rl.question(query, resolve));
  }
}

// 게임 시작
const game = new GameManager();
game.start();
