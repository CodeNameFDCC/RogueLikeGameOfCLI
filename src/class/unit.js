import { getRandomChance } from "../utils/random.js";

// Unit.js
export class Unit {
  constructor(name, attack, health, defense, level = 1) {
    this.name = name;
    this.attack = attack;
    this.health = health;
    this.defense = defense;
    this.level = level;
    this.stats = { 힘: 1, 민: 1, 지: 1 };
  }

  // 공격 메서드
  attackOpponent(opponent, log) {
    const damage = Math.max(this.attack - opponent.defense, 0);
    opponent.health -= damage;
    log.add(
      `${this.name} 가 ${opponent.name} 에게 ${damage} 의 피해를 입혔습니다.`
    );
  }
  hurt(opponent, log) {
    if (isDodge()) {
      log.add(`${this.name} 가 ${opponent.name} 의 공격을 회피 했습니다.`);
    }
    const damage =
      opponent.attack + opponent.stats.힘 * 1 + opponent.stats.지 * 2;
    const damageCalc = Math.max(damage - this.defense, 0);
    this.health -= damageCalc;
    log.add(
      `${opponent.name} 가 ${this.name} 에게 ${damageCalc} 의 피해를 입혔습니다.`
    );
  }

  isDodge() {
    const agility = this.stats.민;
    const baseDodgeRate = Math.log(agility + 1) * 10; // 민첩에 로그를 적용 (10배로 확대)
    const result = Math.max(0, Math.min(baseDodgeRate, 100)); // 0%에서 100% 사이로 제한

    return getRandomChance(result); //성공 여부
  }

  // 레벨업 메서드
  levelUp(log) {
    this.level += 1;
    this.attack += 5; // 레벨업 시 공격력 증가
    this.health += 10 + this.stats.힘 * 50; // 레벨업 시 체력 증가
    this.defense += 2 + this.stats.민 * 2; // 레벨업 시 방어력 증가
    log.add(`${this.name} 이(가) 레벨 ${this.level} 로 올랐습니다!`);
  }

  // 상태 출력 메서드
  status(log) {
    log.add(
      `${this.name} - 레벨 : ${this.level}, 공격력 : ${this.attack}, 체력 : ${this.health}, 방어력 : ${this.defense}`
    );
  }
}
