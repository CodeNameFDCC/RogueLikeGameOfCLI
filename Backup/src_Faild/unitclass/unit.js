import { StatusEffect } from "../skills/statuseffect.js"; // 경로 수정
import { Logger } from "../utils/log.js";
import { Stats } from "../data/stats.js";
import { MyMath } from "../utils/math.js";
import { Random } from "../utils/random.js";

export class Unit {
  constructor(name, level) {
    this.random = new Random();
    this.math = new MyMath();
    this.stat = new Stats();

    this.name = name;
    this.level = level;

    this.stats = { strength: 1, agility: 1, intelligence: 1 };

    this.maxHealth = this.stat.strenthToHealth(level);
    this.health = this.maxHealth;

    this.maxMana = this.stat.intelligenceToMana(level);
    this.mana = this.maxMana;

    this.defense = this.stat.agilityToDefense(this.stats.intelligence);

    this.currentExp = 0;
    this.nextExp = this.stat.nextExp(level);

    this.log = new Logger(name);
    this.statusEffects = []; // 상태이상 효과 목록
  }

  async applyStatusEffect(statusEffect) {
    this.statusEffects.push(statusEffect);
    await this.log.createTypingEffect(
      `${this.name}에게 ${statusEffect.name} 상태이상이 적용되었습니다. (${statusEffect.duration}턴 지속)`
    ); // 타이핑 효과로 메시지 출력
  }

  async updateStatusEffects() {
    for (const effect of this.statusEffects) {
      effect.duration--;
      if (effect.duration <= 0) {
        await this.log.createTypingEffect(
          `${this.name}의 ${effect.name} 효과가 사라졌습니다.`
        ); // 타이핑 효과로 메시지 출력
      }
    }
    this.statusEffects = this.statusEffects.filter(
      (effect) => effect.duration > 0
    );
  }
}
