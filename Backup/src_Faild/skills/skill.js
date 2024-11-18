export class Skill {
  constructor(
    name,
    damage,
    manaCost,
    levelRequirement,
    description,
    type,
    target,
    statusEffect
  ) {
    this.name = name; // 스킬 이름
    this.damage = damage; // 데미지
    this.manaCost = manaCost; // 소비 마나
    this.levelRequirement = levelRequirement; // 레벨 요구사항
    this.description = description; // 스킬 설명
    this.type = type; // 스킬 타입 (예: 공격, 방어 등)
    this.target = target; // 타겟
    this.statusEffect = statusEffect; // 상태이상 효과
  }

  use(caster, target) {
    if (caster.level < this.levelRequirement) {
      console.log(
        `${caster.name}는 레벨 ${this.levelRequirement}이 필요합니다.`
      );
      return;
    }

    if (caster.mana < this.manaCost) {
      console.log(`${caster.name}의 마나가 부족합니다.`);
      return;
    }

    // 마나 소비
    caster.mana -= this.manaCost;

    // 타겟에게 데미지 적용
    target.takeDamage(this.damage);
    console.log(
      `${caster.name}이(가) ${target.name}에게 ${this.damage}의 데미지를 입혔습니다.`
    );

    // 상태이상 효과 적용
    if (this.statusEffect) {
      this.statusEffect.apply(target);
    }
  }
}
