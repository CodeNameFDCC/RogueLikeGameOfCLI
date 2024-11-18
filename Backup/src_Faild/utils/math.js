export class MyMath {
  calculatePhysicalDamage(damage, armor) {
    const damageReduction = armor / (100 + armor);
    const finalDamage = damage * (1 - damageReduction);
    return finalDamage;
  }

  calculateMagicDamage(damage, magicResist) {
    const damageReduction = magicResist / (100 + magicResist);
    const finalDamage = damage * (1 - damageReduction);
    return finalDamage;
  }

  calculateAgilityToDodge = (agility) => {
    const baseDodgeRate = Math.log(agility + 1) * 10; // 민첩에 로그를 적용 (10배로 확대)
    return Math.max(0, Math.min(baseDodgeRate, 100)); // 0%에서 100% 사이로 제한
  };
}
