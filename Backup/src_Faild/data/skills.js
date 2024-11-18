import { Skill } from "../skills/skill.js";

const fireball = new Skill(
  "파이어볼",
  20,
  10,
  3,
  "강력한 불의 주문",
  "공격",
  target,
  pisonEffect
);

//#region 기술들
// Skill Definitions
export const SPELLS = {
  물리공격: {
    damage: 4,
    manaCost: 0,
    level: 1,
    description: "기본 공격",
    type: "physics",
    target: "self",
    state: "기절",
  },
  루모스: {
    damage: 10,
    manaCost: 5,
    level: 1,
    description: "기본 빛 마법",
    state: "",
  },
  에너지볼트: {
    damage: 15,
    manaCost: 12,
    level: 2,
    description: "짜릿한 탄산수 맛!",
    state: "감전",
  },
  인센디오: {
    damage: 25,
    manaCost: 15,
    level: 3,
    description: "화염 마법",
    state: "화상",
  },
  고독: {
    damage: 15,
    manaCost: 20,
    level: 4,
    description: "독중에 가장 높은 독 그것은 고독이다!",
    state: "중독",
  },
  스투페파이: {
    damage: 40,
    manaCost: 25,
    level: 5,
    description: "기절 마법",
    state: "기절",
  },
  엑스펠리아무스: {
    damage: 60,
    manaCost: 35,
    level: 6,
    description: "무장해제 마법",
    state: "약화",
  },
  아바다케다브라: {
    damage: 100,
    manaCost: 50,
    level: 7,
    description: "죽음의 마법",
    state: "",
  },
  꽁스킬: {
    damage: 15,
    manaCost: 7,
    level: 0,
    description: "꽁짜로 얻은 능력",
    state: "",
  },
  눈찌르고도망가기: {
    damage: 4,
    manaCost: 36,
    level: 0,
    description: "36계 줄 행 랑",
    state: "",
  },
  에어컷: {
    damage: 45,
    manaCost: 0,
    level: 8,
    description: "바람을 가르고 바람의 상처!",
    state: "출혈2",
  },
  파괴의일격: {
    damage: 150,
    manaCost: 0,
    level: 9,
    description: "강력한 파괴력으로 단일 타격을 준다.",
    state: "기절",
  },
  신속한회피: {
    damage: 3,
    manaCost: 70,
    level: 10,
    description: "신속한 회피 상대방의 스킬 1회 회피",
    state: "회피",
  },
  혼돈의소용돌이: {
    damage: 50,
    manaCost: 150,
    level: 11,
    description: "혼란하다! 혼란해!",
    state: "혼란",
  },
  강철방어: {
    damage: 7,
    manaCost: 150,
    level: 12,
    description: "적의 공격이 약해졌다면 나는 강해졌다!",
    state: "공격감소",
  },
  치유의기원: {
    damage: 33,
    manaCost: 150,
    level: 13,
    description: "아군의 체력을 회복시킨다. 내가 바로 아군!!",
    state: "치유1",
  },
  마나전환: {
    damage: 22,
    manaCost: 0,
    level: 14,
    description: "체력 10% 마나로 화전 해드립니다!",
    state: "마나전환",
  },
  저주받은스킬: {
    damage: 1,
    manaCost: 0,
    level: 0,
    description: "적을 회복 시켜줍니다.",
    state: "쉽지않네",
  },
  진혼의노래: {
    damage: 33,
    manaCost: 200,
    level: 15,
    description: "지금부터 7턴 동안 살아남아라!",
    state: "최후의노래",
  },
  고양이둔갑: {
    damage: 2,
    manaCost: 10,
    level: 0,
    description: "야옹...",
    state: "에옹...",
  },
  러시안룰렛: {
    damage: 100,
    manaCost: 10,
    level: 16,
    description: "너도 한방 나도 한방!",
    state: "도박",
  },
  기도: {
    damage: 22,
    manaCost: 10,
    level: 17,
    description: "뭔가가 일어나고 있다!",
    state: "뭔가",
  },
  사기꾼의목소리: {
    damage: 44,
    manaCost: 10,
    level: 18,
    description: "적에게 사기를 쳐서 정신적 데미지를 준다.",
    state: "사기",
  },
  도둑의손길: {
    damage: 33,
    manaCost: 10,
    level: 0,
    description: "적에게 돈과 아이템을 갈취한다!",
    state: "도둑질",
  },
  칼춤: {
    damage: 50,
    manaCost: 30,
    level: 0,
    description: "자신과 적 모두에게 치명상을 입힙니다!",
    state: "칼치기",
  },
  모기와함깨춤을: {
    damage: 20,
    manaCost: 50,
    level: 0,
    description: "흡혈귀 처럼 피를 마셔요!",
    state: "흡혈",
  },
};

//#endregion
