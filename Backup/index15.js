import chalk from "chalk";
import readlineSync from "readline-sync";

//#region 텍스트 출력 및 색상

// Color Functions
const Colors = {
  spell: (str) => chalk.cyan(`${str}`),
  danger: (str) => chalk.red.bold(`${str}`),
  success: (str) => chalk.green(`${str}`),
  warning: (str) => chalk.yellow(`${str}`),
  magic: (str) => chalk.magentaBright.bold.italic(`${str}`),
  info: (str) => chalk.blue(`${str}`),
  exp: (str) => chalk.yellow.bold(`${str}`),
};

//#region 편의기능
// Utility Functions
function Clear() {
  console.clear();
}

async function Delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function TypeEffect(text, color = Colors.info, ms = 50) {
  const formattedText = text.replace(/([.,])\s*/g, "$1\n");
  for (let char of formattedText) {
    process.stdout.write(color(char));
    await Delay(ms);
  }
  console.log();
}

//#endregion

//#endregion

//#region 마법의 기본 설정

const spells = {
  물리공격: {
    damage: 4,
    manaCost: 0,
    level: 1,
    description: "기본 공격",
    state: "기절1",
    isGet: true,
  },
  도망: {
    damage: 4,
    manaCost: 0,
    level: 1,
    description: "36계 병법서:  도망가는 것도 뛰어난 전략이다.",
    state: "",
    isGet: true,
  },
  헥토파스칼킥: {
    damage: 20,
    manaCost: 15,
    level: 2,
    description: "선빵 필승!",
    state: "넘어짐",
    isGet: false,
  },
  몽둥이질: {
    damage: 20,
    manaCost: 15,
    level: 2,
    description: "이제 이 몽둥이의 이름은 변호사야",
    state: "기절",
    isGet: false,
  },
  이중공격: {
    damage: 20,
    manaCost: 100,
    level: 3,
    description: "공격을 2번 합니다.",
    state: "이중공격",
    isGet: false,
  },
  날카로운일격: {
    damage: 20,
    manaCost: 100,
    level: 4,
    description: "적에게 치명상을 입힙니다.",
    state: "출혈",
    isGet: false,
  },
};

//#endregion

//#region 유닛 클레스 공통

class Unit {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.exp = 0;
    this.expToNext = 100;
    this.health = 100;
    this.maxHealth = 100;
    this.mana = 50;
    this.maxMana = 50;
    this.spells = ["물리공격", "도망가기"];
    this.gold = 0;
    this.stats = { 힘: 1, 민: 1, 지: 1 };
    this.statusAilments = [];
    this.items = [];
  }

  //경험치 추가
  gainExp(amount) {
    this.exp += amount;
    while (this.exp >= this.expToNext) {
      this.levelUp();
    }
  }

  //스텟 추가
  addStats(key, amount) {
    const stat = this.stats;
    if (stat.hasOwnProperty(key)) {
      stat[key] += amount;
    } else {
      console.log(`해당 능력이 존재 하지 않습니다.`);
    }
  }

  //레벨업
  levelUp() {
    this.level += 1;
    this.exp -= this.expToNext;
    this.expToNext = Math.floor(this.expToNext * 1.5);
    this.maxHealth += 20;
    this.maxMana += 10;
    this.health = this.maxHealth;
    this.mana = this.maxMana;
  }

  //데미지 감소
  calculateDamage(baseDamage, armor) {
    // 방어력에 의한 피해 감소 계산
    const damageReduction = armor / (100 + armor);

    // 최종 피해 계산
    const finalDamage = baseDamage * (1 - damageReduction);

    // 음수 데미지 방지
    return Math.max(finalDamage, 0);
  }

  //스펠 추가
  addSpell(spell) {
    if (this.spells.find((x) => x === spell)) return;
    else {
      this.spells.push(spell);
    }
  }

  //내가 가진 스펠 제외하고 내보내기
  spellFilter(spellArr) {
    const result = spellArr.filter((x) => !this.spells.includes(x));
    return result;
  }

  //고통 받기
  hurt(amount) {
    const damage = calculateDamage(amount, this.민);
    this.health -= damage;
  }

  //사망
  isDeath() {
    return this.health <= 0;
  }

  addStatusAilments(statusAilment, duration, amount) {
    if (statusAilments.find((x) => x === statusAilment)) {
      this.statusAilments[statusAilment] = {
        duration: duration,
        amount: amount,
      };
    }
  }
}

//#endregion

//#region Player

class Player extends Unit {}

//#endregion
