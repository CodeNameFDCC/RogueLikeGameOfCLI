import chalk from "chalk";
import readlineSync from "readline-sync";

// 기본 색상 설정 클래스
class ColorManager {
  static spell = (str) => chalk.cyan(`${str}`);
  static danger = (str) => chalk.red.bold(`${str}`);
  static success = (str) => chalk.green(`${str}`);
  static warning = (str) => chalk.yellow(`${str}`);
  static magic = (str) => chalk.magentaBright.bold.italic(`${str}`);
  static info = (str) => chalk.blue(`${str}`);
  static exp = (str) => chalk.yellow.bold(`${str}`);
}

// 기본 캐릭터 클래스
class Character {
  constructor(name, level, health, mana) {
    this.name = name;
    this.level = level;
    this.health = health;
    this.maxHealth = health;
    this.mana = mana;
    this.maxMana = mana;
    this.statusAilments = [];
    this.weakened = false;
  }

  // 상태이상 관련 메서드
  async processStatusAilments() {
    if (this.statusAilments.length === 0) return;

    console.log(
      `\n${ColorManager.warning(`${this.name}의 상태이상 효과 처리:`)}`
    );

    this.statusAilments = this.statusAilments.filter((ailment) => {
      const statusEffect = STATUS_AILMENTS[ailment.name];
      const message = statusEffect.effect(this);
      console.log(ColorManager.warning(message));

      ailment.turnsRemaining--;

      if (ailment.turnsRemaining <= 0) {
        if (ailment.name === "약화") this.weakened = false;
        console.log(
          ColorManager.success(
            `${this.name}의 ${ailment.name} 상태가 해제되었습니다.`
          )
        );
        return false;
      }
      return true;
    });
  }

  isState(state) {
    return this.statusAilments.some((ailment) => ailment.name === state);
  }

  applyStatusAilment(state) {
    if (STATUS_AILMENTS[state]) {
      this.statusAilments.push({
        name: state,
        turnsRemaining: STATUS_AILMENTS[state].duration,
      });
      console.log(`${this.name}는 ${state} 상태 이상에 걸렸습니다.`);
    }
  }

  calculateDamage(baseDamage) {
    return this.weakened ? Math.floor(baseDamage * 0.7) : baseDamage;
  }

  // 체력바/마나바 표시
  getHealthBar(length = 20) {
    const filledLength = Math.round((this.health / this.maxHealth) * length);
    const emptyLength = length - filledLength;
    return (
      ColorManager.success("█".repeat(filledLength)) +
      ColorManager.danger("░".repeat(emptyLength))
    );
  }

  getManaBar(length = 20) {
    const filledLength = Math.round((this.mana / this.maxMana) * length);
    const emptyLength = length - filledLength;
    return (
      ColorManager.magic("█".repeat(filledLength)) +
      ColorManager.info("░".repeat(emptyLength))
    );
  }
}

// 플레이어 클래스
class Player extends Character {
  constructor(name) {
    super(name, 1, 100, 50);
    this.exp = 0;
    this.expToNext = 100;
    this.spells = ["물리공격", "루모스", "도망가기"];
    this.gold = 0;
    this.stats = {
      strength: 1,
      intelligence: 1,
      wisdom: 1,
    };
  }

  gainExp(amount) {
    this.exp += amount;
    while (this.exp >= this.expToNext) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;
    this.exp -= this.expToNext;
    this.expToNext = Math.floor(this.expToNext * 1.5);
    this.maxHealth += 20;
    this.maxMana += 10;
    this.health = this.maxHealth;
    this.mana = this.maxMana;

    this.learnNewSpells();
  }

  learnNewSpells() {
    Object.entries(SPELLS).forEach(([spellName, spell]) => {
      if (spell.level === this.level && !this.spells.includes(spellName)) {
        this.spells.push(spellName);
        TypeEffect(
          `새로운 주문 '${spellName}'을 습득했습니다!`,
          ColorManager.success
        );
      }
    });
  }

  displayStats() {
    console.log(ColorManager.info("━".repeat(40)));
    console.log(ColorManager.success(`체력: ${this.health}/${this.maxHealth}`));
    console.log(ColorManager.magic(`마나: ${this.mana}/${this.maxMana}`));
    console.log(
      ColorManager.exp(`레벨: ${this.level} (${this.exp}/${this.expToNext})`)
    );
    console.log(ColorManager.warning(`골드: ${this.gold}G`));
    console.log(ColorManager.info("━".repeat(40)));
    console.log(ColorManager.spell("스텟:"));
    console.log(ColorManager.info(`힘: ${this.stats.strength}`));
    console.log(ColorManager.info(`지능: ${this.stats.intelligence}`));
    console.log(ColorManager.info(`지혜: ${this.stats.wisdom}`));
    console.log(ColorManager.info("━".repeat(40)));
  }

  displaySpells() {
    console.log(ColorManager.magic("보유 주문:"));
    this.spells.forEach((spell) => {
      console.log(
        ColorManager.spell(
          `- ${spell} (공격력: ${SPELLS[spell].damage} 마나: ${SPELLS[spell].manaCost})`
        )
      );
    });
  }
}

// 적 클래스
class Enemy extends Character {
  constructor(level) {
    const name = Enemy.generateName();
    super(name, level, 50 + level * 20, 30 + level * 10);
    this.spells = this.getSpellsByLevel(level);
  }

  static generateName() {
    const firstNames = ["검은", "붉은", "푸른", "하얀", "그림자"];
    const lastNames = ["마법사", "마도사", "주술사", "흑마법사", "연금술사"];
    return (
      firstNames[Math.floor(Math.random() * firstNames.length)] +
      " " +
      lastNames[Math.floor(Math.random() * lastNames.length)]
    );
  }

  getSpellsByLevel(level) {
    return Object.entries(SPELLS)
      .filter(([_, spell]) => spell.level <= level)
      .map(([name, _]) => name);
  }

  selectSpell() {
    const availableSpells = this.spells.filter(
      (spell) => SPELLS[spell].manaCost <= this.mana
    );
    if (availableSpells.length === 0) return null;
    return availableSpells[Math.floor(Math.random() * availableSpells.length)];
  }
}

// 게임 매니저 클래스
class GameManager {
  constructor() {
    this.player = null;
  }

  async initialize() {
    console.clear();
    console.log(ColorManager.magic(TITLE_ART));
    await TypeEffect("마법 학교에 오신 것을 환영합니다!", ColorManager.success);
    const name = readlineSync.question(
      ColorManager.info("당신의 이름은 무엇인가요? ")
    );
    this.player = new Player(name);
  }

  async handleChoice(options, messages, other = "올바르지 않은 선택입니다") {
    const formattedMessages = messages
      .split(",")
      .map((choice, index) => `${index + 1}. ${choice.trim()}`)
      .join("\n");

    const choice = readlineSync.question(
      ColorManager.warning(formattedMessages + "\n")
    );

    if (options[choice]) {
      await options[choice]();
    } else {
      await TypeEffect(other, ColorManager.danger);
    }
  }

  displayBattleStatus(enemy) {
    console.log(ColorManager.info("━".repeat(60)));

    console.log(ColorManager.success("[ 플레이어 상태 ]"));
    console.log(
      `${ColorManager.info(this.player.name)} (Lv.${this.player.level})`
    );
    console.log(
      `HP: ${this.player.getHealthBar()} ${this.player.health}/${
        this.player.maxHealth
      }`
    );
    console.log(
      `MP: ${this.player.getManaBar()} ${this.player.mana}/${
        this.player.maxMana
      }`
    );

    console.log(ColorManager.info("\n< VS >\n"));

    console.log(ColorManager.danger("[ 적 상태 ]"));
    console.log(`${ColorManager.danger(enemy.name)} (Lv.${enemy.level})`);
    console.log(
      `HP: ${enemy.getHealthBar()} ${enemy.health}/${enemy.maxHealth}`
    );
    console.log(`MP: ${enemy.getManaBar()} ${enemy.mana}/${enemy.maxMana}`);

    console.log(ColorManager.info("━".repeat(60)));
  }
}

const game = new GameManager();

await game.initialize();
