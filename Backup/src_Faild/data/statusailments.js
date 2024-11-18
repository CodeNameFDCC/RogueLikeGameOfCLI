//#region 상태이상
// 상태 이상 효과 정의
const STATUS_AILMENTS = {
  중독: {
    damagePerTurn: 5,
    duration: 3,
    effect: (target) => {
      target.health -= 5;
      return `${target.name}가 중독으로 5의 피해를 입었습니다.`;
    },
  },
  기절: {
    damagePerTurn: 0,
    duration: 2,
    effect: (target) => {
      return `${target.name}는 기절 상태로 행동할 수 없습니다.`;
    },
  },
  약화: {
    damagePerTurn: 0,
    duration: 4,
    effect: (target) => {
      // 약화 상태일 때 데미지 감소
      target.weakened = true;
      return `${target.name}의 공격력이 감소했습니다.`;
    },
  },
  흡혈: {
    damagePerTurn: 0,
    duration: 4,
    effect: (target) => {
      // 체력회복
      target.health += 20;
      return `${target.name}는 흡혈 효과로 체력을 회복했습니다`;
    },
  },
  쉽지않네: {
    damagePerTurn: 0,
    duration: 1,
    effect: (target) => {
      target.whatthe = true;
      return `${target.name}는 쉽지않네 효과로 적의 체력이 회복되었습니다.`;
    },
  },
  감전: {
    damagePerTurn: 0,
    duration: 1,
    effect: (target) => {
      return `${target.name}는 감전 효과로 행동이 감소했습니다`;
    },
  },
};
//#endregion
