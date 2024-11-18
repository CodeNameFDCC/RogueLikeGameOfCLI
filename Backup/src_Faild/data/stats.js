export class Stats {
  strenthToHealth = (level) => 50 + level * 20;
  strenthToAttack = (level) => level * 5;

  intelligenceToMana = (level) => 30 + level * 10;
  intelligenceToMagicAttack = (level) => level * 4;

  agilityToDefense = (level) => level * 3; // 레벨당 3의 방어력 증가
  agilityToDodge = (level) => level * 2; // 레벨당 2의 회피율 증가

  nextExp = (level) => 100 + (level - 1) * 50; //1렙 100exp 2렙 50씩 증가
}
