import chalk from "chalk";
import readlineSync from "readline-sync";

//#region 색상 지정
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

//#endregion

//#region 타이틀
// ASCII Art
const titleArt = `
███╗   ███╗ █████╗  ██████╗ ██╗ ██████╗
████╗ ████║██╔══██╗██╔════╝ ██║██╔════╝
██╔████╔██║███████║██║  ███╗██║██║     
██║╚██╔╝██║██╔══██║██║   ██║██║██║     
██║ ╚═╝ ██║██║  ██║╚██████╔╝██║╚██████╗
╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝ ╚═════╝
        𝕊𝕔𝕙𝕠𝕠𝕝 𝕠𝕗 𝕎𝕠𝕟𝕕𝕖𝕣𝕤           
`;
//#endregion

//#region 기술들
// Skill Definitions
const SPELLS = {
  물리공격: {
    damage: 4,
    manaCost: 0,
    level: 1,
    description: "기본 공격",
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
    level: 1,
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
    level: 3,
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
    level: 7,
    description: "무장해제 마법",
    state: "약화",
  },
  아바다케다브라: {
    damage: 100,
    manaCost: 50,
    level: 10,
    description: "죽음의 마법",
    state: "",
  },
  꽁스킬: {
    damage: 15,
    manaCost: 7,
    level: 1,
    description: "꽁짜로 얻은 능력",
    state: "",
  },
  도망가기: {
    damage: 0,
    manaCost: 0,
    level: 1,
    description: "36계 줄 행 랑",
    state: "",
  },
  에어컷: {
    damage: 45,
    manaCost: 0,
    level: 3,
    description: "바람을 가르고 바람의 상처!",
    state: "출혈2",
  },
  파괴의일격: {
    damage: 150,
    manaCost: 0,
    level: 5,
    description: "강력한 파괴력으로 단일 타격을 준다.",
    state: "기절",
  },
  신속한회피: {
    damage: 0,
    manaCost: 70,
    level: 4,
    description: "신속한 회피 상대방의 스킬 1회 회피",
    state: "회피",
  },
  혼돈의소용돌이: {
    damage: 50,
    manaCost: 150,
    level: 6,
    description: "혼란하다! 혼란해!",
    state: "혼란",
  },
  강철방어: {
    damage: 0,
    manaCost: 150,
    level: 6,
    description: "적의 공격이 약해졌다면 나는 강해졌다!",
    state: "공격감소",
  },
  치유의기원: {
    damage: 0,
    manaCost: 150,
    level: 6,
    description: "아군의 체력을 회복시킨다. 내가 바로 아군!!",
    state: "치유1",
  },
  마나전환: {
    damage: 0,
    manaCost: 0,
    level: 3,
    description: "체력 10% 마나로 화전 해드립니다!",
    state: "마나전환",
  },
  저주받은스킬: {
    damage: -50,
    manaCost: 0,
    level: 2,
    description: "적을 회복 시켜줍니다.",
    state: "쉽지않네",
  },
  진혼의노래: {
    damage: 0,
    manaCost: 200,
    level: 7,
    description: "지금부터 7턴 동안 살아남아라!",
    state: "최후의노래",
  },
  고양이둔갑: {
    damage: 0,
    manaCost: 10,
    level: 1,
    description: "야옹...",
    state: "에옹...",
  },
  러시안룰렛: {
    damage: 0,
    manaCost: 10,
    level: 1,
    description: "너도 한방 나도 한방!",
    state: "도박",
  },
  기도: {
    damage: 0,
    manaCost: 10,
    level: 1,
    description: "뭔가가 일어나고 있다!",
    state: "뭔가",
  },
  사기꾼의목소리: {
    damage: 0,
    manaCost: 10,
    level: 1,
    description: "적에게 사기를 쳐서 정신적 데미지를 준다.",
    state: "사기",
  },
  도둑의손길: {
    damage: 0,
    manaCost: 10,
    level: 5,
    description: "적에게 돈과 아이템을 갈취한다!",
    state: "도둑질",
  },
  칼춤: {
    damage: 50,
    manaCost: 30,
    level: 6,
    description: "자신과 적 모두에게 치명상을 입힙니다!",
    state: "칼치기",
  },
  모기와함깨춤을: {
    damage: 20,
    manaCost: 50,
    level: 4,
    description: "흡혈귀 처럼 피를 마셔요!",
    state: "흡혈",
  },
};

//#endregion

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
};
//#endregion

//#region 상태이상 효과 처리
// 상태 이상 효과 처리
async function ProcessStatusAilments(target) {
  if (target.statusAilments.length === 0) return;

  console.log(`\n${Colors.warning(`${target.name}의 상태이상 효과 처리:`)}`);

  // 각 상태이상 효과 처리
  target.statusAilments = target.statusAilments.filter((ailment) => {
    const statusEffect = STATUS_AILMENTS[ailment.name];
    const message = statusEffect.effect(target);
    console.log(Colors.warning(message));

    // 턴 감소
    ailment.turnsRemaining--;

    // 상태이상이 끝났을 때
    if (ailment.turnsRemaining <= 0) {
      if (ailment.name === "약화") {
        target.weakened = false;
      }
      console.log(
        Colors.success(
          `${target.name}의 ${ailment.name} 상태가 해제되었습니다.`
        )
      );
      return false;
    }
    return true;
  });
}
//#endregion

//#region 적 마법사
// 적 마법사 클래스 추가
class Enemy {
  constructor(level) {
    this.name = this.generateName();
    this.level = level;
    this.health = 50 + level * 20;
    this.maxHealth = this.health;
    this.mana = 30 + level * 10;
    this.maxMana = this.mana;
    this.spells = this.getSpellsByLevel(level);
    this.statusAilments = []; // 현재 상태 이상 효과
  }
  /*

*/
  generateName() {
    const firstNames = ["검은", "붉은", "푸른", "하얀", "그림자"];
    const lastNames = ["마법사", "마도사", "주술사", "흑마법사", "연금술사"];
    return (
      firstNames[Math.floor(Math.random() * firstNames.length)] +
      " " +
      lastNames[Math.floor(Math.random() * lastNames.length)]
    );
  }
  /*
SPELLS는 주문에 대한 정보를 담고 있는 객체입니다.
Object.entries() 메서드는 객체의 키-값 쌍을 배열의 형태로 반환합니다. 
이 경우, SPELLS 객체의 모든 주문 이름과 해당 주문의 정보가 배열로 반환됩니다.

filter 메서드는 배열의 각 요소를 검사하여 주어진 조건을 만족하는 요소만 남깁니다.
여기서 사용되는 배열의 각 요소는 [name, spell] 형태입니다. 
name은 주문의 이름이고, spell은 주문의 정보 객체입니다.
(_, spell)의 첫 번째 인자는 사용하지 않기 때문에 _로 표현하여 무시합니다.
조건 spell.level <= level은 현재 주문의 레벨이 입력된 level 이하인 경우에만 해당 주문을 남기도록 합니다.


map 메서드는 배열의 각 요소를 변환하여 새로운 배열을 반환합니다.
여기서는 filter를 통해 남은 주문들에서 이름만 추출합니다. 
(_, _)의 첫 번째 인자와 두 번째 인자는 각각 이름과 주문 정보를 나타내지만, 
주문 정보는 필요 없으므로 _로 무시합니다.
최종적으로 주문의 이름만으로 구성된 배열이 반환됩니다.

*/
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
//#endregion

//#region 전투상태 표시

// 전투 상태 표시 함수
function DisplayBattleStatus(enemy) {
  console.log(Colors.info("━".repeat(60)));

  // 플레이어 상태
  console.log(Colors.success("[ 플레이어 상태 ]"));
  const playerHealthBar = CreateHealthBar(
    playerState.health,
    playerState.maxHealth
  );
  const playerManaBar = CreateManaBar(playerState.mana, playerState.maxMana);
  console.log(`${Colors.info(playerState.name)} (Lv.${playerState.level})`);
  console.log(
    `HP: ${playerHealthBar} ${playerState.health}/${playerState.maxHealth}`
  );
  console.log(
    `MP: ${playerManaBar} ${playerState.mana}/${playerState.maxMana}`
  );

  console.log(Colors.info("\n< VS >\n"));

  // 적 상태
  console.log(Colors.danger("[ 적 상태 ]"));
  const enemyHealthBar = CreateHealthBar(enemy.health, enemy.maxHealth);
  const enemyManaBar = CreateManaBar(enemy.mana, enemy.maxMana);
  console.log(`${Colors.danger(enemy.name)} (Lv.${enemy.level})`);
  console.log(`HP: ${enemyHealthBar} ${enemy.health}/${enemy.maxHealth}`);
  console.log(`MP: ${enemyManaBar} ${enemy.mana}/${enemy.maxMana}`);

  console.log(Colors.info("━".repeat(60)));
}

// 체력바 생성 함수
function CreateHealthBar(current, max, length = 20) {
  const filledLength = Math.round((current / max) * length);
  const emptyLength = length - filledLength;
  return (
    Colors.success("█".repeat(filledLength)) +
    Colors.danger("░".repeat(emptyLength))
  );
}

// 마나바 생성 함수
function CreateManaBar(current, max, length = 20) {
  const filledLength = Math.round((current / max) * length);
  const emptyLength = length - filledLength;
  return (
    Colors.magic("█".repeat(filledLength)) +
    Colors.info("░".repeat(emptyLength))
  );
}

//#endregion

//#region 플레이어 상태
// Game State
let playerState = {
  name: "",
  level: 1,
  exp: 0,
  expToNext: 100,
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  spells: ["물리공격", "루모스", "도망가기"],
  gold: 0,
  stats: {
    strength: 1,
    intelligence: 1,
    wisdom: 1,
  },
  statusAilments: [],
};

//#endregion

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

//#region 스테이터스 오픈!
function DisplayStats() {
  console.log(Colors.info("━".repeat(40)));
  console.log(
    Colors.success(`체력: ${playerState.health}/${playerState.maxHealth}`)
  );
  console.log(Colors.magic(`마나: ${playerState.mana}/${playerState.maxMana}`));
  console.log(
    Colors.exp(
      `레벨: ${playerState.level} (${playerState.exp}/${playerState.expToNext})`
    )
  );
  console.log(Colors.warning(`골드: ${playerState.gold}G`));
  console.log(Colors.info("━".repeat(40)));
  console.log(Colors.spell("스텟:"));
  console.log(Colors.info(`힘: ${playerState.stats.strength}`));
  console.log(Colors.info(`지능: ${playerState.stats.intelligence}`));
  console.log(Colors.info(`지혜: ${playerState.stats.wisdom}`));
  console.log(Colors.info("━".repeat(40)));
}

//#endregion

//#region 주문표시
function DisplaySpells() {
  console.log(Colors.magic("보유 주문:"));
  playerState.spells.forEach((spell) => {
    console.log(
      Colors.spell(
        `- ${spell} (공격력: ${SPELLS[spell].damage} 마나: ${SPELLS[spell].manaCost})`
      )
    );
  });
}

//#endregion

//#region 경험치 획득득
function GainExp(amount) {
  playerState.exp += amount;
  while (playerState.exp >= playerState.expToNext) {
    LevelUp();
  }
}

//#endregion

//#region 레벨업
function LevelUp() {
  playerState.level += 1;
  playerState.exp -= playerState.expToNext;
  playerState.expToNext = Math.floor(playerState.expToNext * 1.5);
  playerState.maxHealth += 20;
  playerState.maxMana += 10;
  playerState.health = playerState.maxHealth;
  playerState.mana = playerState.maxMana;

  // 새로운 주문 습득
  Object.entries(SPELLS).forEach(([spellName, spell]) => {
    if (
      spell.level === playerState.level &&
      !playerState.spells.includes(spellName)
    ) {
      playerState.spells.push(spellName);
      TypeEffect(`새로운 주문 '${spellName}'을 습득했습니다!`, Colors.success);
    }
  });
}
//#endregion

//#region 선택
async function HandleChoice(
  options,
  messages,
  other = "올바르지 않은 선택입니다"
) {
  const formattedMessages = messages
    .split(",")
    .map((choice, index) => `${index + 1}. ${choice.trim()}`)
    .join("\n");

  const choice = readlineSync.question(
    Colors.warning(formattedMessages + "\n")
  );

  if (options[choice]) {
    await options[choice]();
  } else {
    await TypeEffect(other, Colors.danger);
  }
}
//#endregion

//#region 타이틀씬
// Scenes
async function TitleScene() {
  Clear();
  console.log(Colors.magic(titleArt));
  await TypeEffect("마법 학교에 오신 것을 환영합니다!", Colors.success);
  playerState.name = readlineSync.question(
    Colors.info("당신의 이름은 무엇인가요? ")
  );

  await HandleChoice(
    {
      1: EntranceHallScene,
      2: process.exit,
    },
    "입학하기,나가기"
  );
}
//#endregion

//#region 상태이상 적용
function ApplyStatusAilment(target, state) {
  if (STATUS_AILMENTS[state]) {
    target.statusAilments.push({
      name: state,
      turnsRemaining: STATUS_AILMENTS[state].duration,
    });
    console.log(`${target.name}는 ${state} 상태 이상에 걸렸습니다.`);
  }
}
//#endregion

//#region 중앙홀 씬
async function EntranceHallScene() {
  Clear();
  await TypeEffect(
    `${playerState.name}님, 마법 학교의 중앙 홀입니다.`,
    Colors.success
  );
  DisplayStats();
  DisplaySpells();

  await OrizinScene();
  //await TestScene();
}
//#endregion

//#region Scene 리스트
const scenes = [
  SpellClassScene,
  LibraryScene,
  DuelArenaScene,
  TrainingGroundScene,
  StoreScene,
];
//#endregion

//#region 랜덤픽 선택 유틸

function GetRandomChoices(arr, numChoices) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numChoices);
}

//#endregion

//#region 씬 선택

async function SceneSelect() {
  const scene = GetRandomChoices(scenes, 1)[0];
  await scene();
}

//#endregion

//#region Orizin씬

async function OrizinScene() {
  await HandleChoice(
    {
      1: SceneSelect,
    },
    "이동하기, 나가기"
  );
}

//#endregion

//#region 테스트 씬

async function TestScene() {
  await HandleChoice(
    {
      1: SpellClassScene,
      2: LibraryScene,
      3: DuelArenaScene,
      4: TrainingGroundScene,
      5: StoreScene,
    },
    "마법 교실로 이동,도서관으로 이동,결투장으로 이동,훈련장으로 이동,상점으로 이동"
  );
}
//#endregion

//#region 교실
async function SpellClassScene() {
  Clear();
  const expGain = 20;
  await TypeEffect("마법 교실에 입장했습니다.", Colors.spell);
  GainExp(expGain);
  await TypeEffect(`수업을 통해 ${expGain} 경험치를 획득했습니다!`, Colors.exp);
  await Delay(1000);
  EntranceHallScene();
}
//#endregion

//#region 도서관

//#region 도서관 효과 목록
const effects = [
  {
    name: "마나 회복",
    amount: 20,
    apply: (player) => {
      player.mana += 20;
      if (player.mana > player.maxMana) {
        player.mana = player.maxMana;
      }
      return "마나가 회복되었습니다.";
    },
  },
  {
    name: "지혜 증가",
    amount: 1,
    apply: (player) => {
      player.stats.wisdom += 1;
      return "지혜가 1 증가했습니다.";
    },
  },
  {
    name: "체력 회복",
    amount: 30,
    apply: (player) => {
      player.health += 30;
      if (player.health > player.maxHealth) {
        player.health = player.maxHealth;
      }
      return "체력이 회복되었습니다.";
    },
  },
];

//#endregion

//#region 도서관

async function LibraryScene() {
  Clear();
  await TypeEffect("고대의 마법서들이 즐비한 도서관입니다.", Colors.info);

  // 랜덤으로 효과 선택
  const randomEffectIndex = Math.floor(Math.random() * effects.length);
  const selectedEffect = effects[randomEffectIndex];

  // 효과 적용
  const message = selectedEffect.apply(playerState);
  await TypeEffect(message, Colors.success);

  await Delay(1000);
  EntranceHallScene();
}

//#endregion

//#endregion

//#region 기존 도서관 백업
// async function LibraryScene() {
//   Clear();
//   await TypeEffect("고대의 마법서들이 즐비한 도서관입니다.", Colors.info);
//   playerState.mana += 20;
//   if (playerState.mana > playerState.maxMana)
//     playerState.mana = playerState.maxMana;
//   playerState.stats.wisdom += 1;
//   await TypeEffect(
//     "마법서를 읽어 마나가 회복되고 지혜가 1 증가했습니다.",
//     Colors.success
//   );
//   await Delay(1000);
//   EntranceHallScene();
// }

//#endregion

//#region Utill Random
function GetRandomChance(percentage) {
  return Math.random() < percentage * 0.01;
}
//#endregion

//#region 상태확인
//상태 확인
function isState(target, state) {
  return target.statusAilments.some((ailment) => ailment.name === state);
}
//#endregion

//#region 데미지 계산
async function CalculateDamage(baseDamage, attacker) {
  let damage = baseDamage;

  if (GetRandomChance(10)) {
    await TypeEffect("크리티컬 작렬!!!!!", Colors.danger);
    damage *= 2.5;
  }
  // 공격자가 약화 상태라면 데미지 감소
  if (attacker.weakened) {
    damage = Math.floor(damage * 0.7); // 30% 데미지 감소
  }

  return damage;
}

//#endregion

//#region 전투

//듀얼이다!
async function DuelArenaScene() {
  Clear();
  await TypeEffect("결투장에 입장했습니다!", Colors.danger);

  // 적 생성
  const enemy = new Enemy(Math.max(1, playerState.level - 1));
  await TypeEffect(`${enemy.name}가 나타났다!`, Colors.danger);
  await Delay(1500);

  // 전투 루프
  while (enemy.health > 0 && playerState.health > 0) {
    Clear();
    DisplayBattleStatus(enemy);

    // 상태 이상 처리
    await ProcessStatusAilments(playerState);
    await ProcessStatusAilments(enemy);

    // 플레이어 턴 처리
    if (await handlePlayerTurn(enemy)) {
      // 적 턴 처리
      await handleEnemyTurn(enemy);
    }
  }
  await Delay(1500);
  await TypeEffect("전투가 종료 되었습니다!", Colors.danger);

  // 전투 종료 처리
  await handleBattleEnd(enemy);
}

//마이턴
async function handlePlayerTurn(enemy) {
  console.log(Colors.magic("\n[ 당신의 차례 ]"));

  if (await checkIfStunned(playerState)) {
    return false; // 기절 상태로 행동할 수 없음
  }

  const spellChoices = playerState.spells
    .map(
      (spell) =>
        `${spell} (데미지: ${SPELLS[spell].damage} 마나: ${SPELLS[spell].manaCost})`
    )
    .join(",");

  return new Promise((resolve) => {
    HandleChoice(
      playerState.spells.reduce((acc, spell, index) => {
        acc[index + 1] = async () => {
          await handleSpellChoice(spell, enemy);
          resolve(true);
        };
        return acc;
      }, {}),
      spellChoices
    );
  });
}

//스펠 선택
async function handleSpellChoice(spell, enemy) {
  if (spell === "도망가기") {
    if (GetRandomChance(30)) {
      await TypeEffect(
        `${spell} 를 사용하여 ${enemy.name}의 도주 성공.`,
        Colors.danger
      );
      await Delay(2500);
      EntranceHallScene();
      return;
    } else {
      await TypeEffect(`${spell}를 실패했습니다.`, Colors.danger);
    }
  }

  if (playerState.mana >= SPELLS[spell].manaCost) {
    const damage = await CalculateDamage(
      Math.floor(
        SPELLS[spell].damage * (1 + playerState.stats.intelligence * 0.1)
      ),
      playerState
    );

    playerState.mana -= SPELLS[spell].manaCost;
    enemy.health -= damage;
    if (SPELLS[spell].state) ApplyStatusAilment(enemy, SPELLS[spell].state);
    await TypeEffect(
      `${spell} 주문으로 ${damage}의 피해를 입혔습니다!`,
      Colors.success
    );
  } else {
    await TypeEffect("마나가 부족합니다!", Colors.danger);
  }
}

//에네미 턴
async function handleEnemyTurn(enemy) {
  console.log(Colors.danger("\n[ 적의 차례 ]"));
  await Delay(1000);

  if (await checkIfStunned(enemy)) {
    return; // 기절 상태로 행동할 수 없음
  }

  const enemySpell = enemy.selectSpell();
  if (enemySpell) {
    const damage = await CalculateDamage(
      Math.floor(SPELLS[enemySpell].damage * (1 + enemy.level * 0.1)),
      enemy
    );
    enemy.mana -= SPELLS[enemySpell].manaCost;
    playerState.health -= damage;
    if (SPELLS[enemySpell].state) {
      ApplyStatusAilment(playerState, SPELLS[enemySpell].state);
    }
    await TypeEffect(
      `${enemy.name}의 ${enemySpell} 주문! ${damage}의 피해를 입었습니다!`,
      Colors.danger
    );
  } else {
    await TypeEffect(
      `${enemy.name}는 마나가 부족하여 공격하지 못했습니다!`,
      Colors.info
    );
  }

  await Delay(1000);
}

//기절 췤
async function checkIfStunned(unit) {
  if (isState(unit, "기절")) {
    await TypeEffect(
      `${unit.name}는 기절 상태로 인해 행동할 수 없습니다!`,
      Colors.danger
    );
    await Delay(1000);
    return true; // 기절 상태
  }
  return false; // 기절 상태 아님
}

async function handleBattleEnd(enemy) {
  if (enemy.health <= 0) {
    await TypeEffect(`${enemy.name}를 처치했습니다!`, Colors.success);
    // 추가적인 승리 처리
    await Delay(1500);
    const expGain = 50 + enemy.level * 10;
    const goldGain = Math.floor(Math.random() * 30) + enemy.level * 20;
    GainExp(expGain);
    playerState.gold += goldGain;
    await TypeEffect(
      `결투에서 승리! ${expGain} 경험치와 ${goldGain} 골드를 획득했습니다!`,
      Colors.exp
    );
    await Delay(3000);
    EntranceHallScene();
  } else if (playerState.health <= 0) {
    await TypeEffect("당신이 패배했습니다...", Colors.danger);
    await Delay(3000);
    process.exit();
    // 추가적인 패배 처리
  }
}

//#endregion

//#region 이전 전투 코드 백업

// async function DuelArenaScene() {
//   Clear();
//   await TypeEffect("결투장에 입장했습니다!", Colors.danger);

//   // 적 생성
//   const enemy = new Enemy(Math.max(1, playerState.level - 1));
//   await TypeEffect(`${enemy.name}가 나타났다!`, Colors.danger);

//   // 전투 루프
//   while (enemy.health > 0 && playerState.health > 0) {
//     Clear();
//     DisplayBattleStatus(enemy);

//     // 상태이상 처리
//     await ProcessStatusAilments(playerState);
//     await ProcessStatusAilments(enemy);

//     await playerTurn(enemy);
//     await enemyTurn(playerState);
//     // 플레이어 턴
//     //   console.log(Colors.magic("\n[ 당신의 차례 ]"));

//     //   // 기절 상태 체크
//     //   if (isState(playerState, "기절")) {
//     //     await TypeEffect("기절 상태로 인해 행동할 수 없습니다!", Colors.danger);
//     //     await Delay(1000);
//     //   } else {
//     //     console.log(Colors.spell("사용할 주문을 선택하세요:"));
//     //     const spellChoices = playerState.spells
//     //       .map(
//     //         (spell) =>
//     //           `${spell} (데미지: ${SPELLS[spell].damage} 마나: ${SPELLS[spell].manaCost})`
//     //       )
//     //       .join(",");

//     //     const playerTurn = new Promise((resolve) => {
//     //       HandleChoice(
//     //         playerState.spells.reduce((acc, spell, index) => {
//     //           acc[index + 1] = async () => {
//     //             if (spell === "도망가기") {
//     //               if (GetRandomChance(30)) {
//     //                 await TypeEffect(
//     //                   `${spell} 30% 확률을 뚫고 성공했습니다.`,
//     //                   Colors.danger
//     //                 );
//     //                 await Delay(2500);
//     //                 EntranceHallScene();
//     //                 return;
//     //               } else {
//     //                 await TypeEffect(`${spell} 를 실패 했습니다.`, Colors.danger);
//     //               }
//     //             }

//     //             if (playerState.mana >= SPELLS[spell].manaCost) {
//     //               const damage = calculateDamage(
//     //                 Math.floor(
//     //                   SPELLS[spell].damage *
//     //                     (1 + playerState.stats.intelligence * 0.1)
//     //                 ),
//     //                 playerState
//     //               );

//     //               playerState.mana -= SPELLS[spell].manaCost;
//     //               enemy.health -= damage;
//     //               if (SPELLS[spell].state)
//     //                 ApplyStatusAilment(enemy, SPELLS[spell].state);
//     //               await TypeEffect(
//     //                 `${spell} 주문으로 ${damage}의 피해를 입혔습니다!`,
//     //                 Colors.success
//     //               );
//     //               resolve(true);
//     //             } else {
//     //               await TypeEffect("마나가 부족합니다!", Colors.danger);
//     //               resolve(false);
//     //             }
//     //           };
//     //           return acc;
//     //         }, {}),
//     //         spellChoices
//     //       );
//     //     });

//     //     await playerTurn;
//     //   }

//     //   // 적 턴
//     //   if (enemy.health > 0) {
//     //     console.log(Colors.danger("\n[ 적의 차례 ]"));
//     //     await Delay(1000);

//     //     // 기절 상태 체크
//     //     if (isState(enemy, "기절")) {
//     //       await TypeEffect(
//     //         `${enemy.name}는 기절 상태로 인해 행동할 수 없습니다!`,
//     //         Colors.danger
//     //       );
//     //     } else {
//     //       const enemySpell = enemy.selectSpell();
//     //       if (enemySpell) {
//     //         const damage = calculateDamage(
//     //           Math.floor(SPELLS[enemySpell].damage * (1 + enemy.level * 0.1)),
//     //           enemy
//     //         );
//     //         enemy.mana -= SPELLS[enemySpell].manaCost;
//     //         playerState.health -= damage;
//     //         if (SPELLS[enemySpell].state) {
//     //           ApplyStatusAilment(playerState, SPELLS[enemySpell].state);
//     //         }
//     //         await TypeEffect(
//     //           `${enemy.name}의 ${enemySpell} 주문! ${damage}의 피해를 입었습니다!`,
//     //           Colors.danger
//     //         );
//     //       } else {
//     //         await TypeEffect(
//     //           `${enemy.name}는 마나가 부족하여 공격하지 못했습니다!`,
//     //           Colors.info
//     //         );
//     //       }
//     //     }

//     //     await Delay(1000);
//     //   }
//     //   await Delay(1000);
//     // }

//     // // 전투 결과 처리
//     // if (playerState.health > 0) {
//     //   const expGain = 50 + enemy.level * 10;
//     //   const goldGain = Math.floor(Math.random() * 30) + enemy.level * 20;
//     //   GainExp(expGain);
//     //   playerState.gold += goldGain;
//     //   await TypeEffect(
//     //     `결투에서 승리! ${expGain} 경험치와 ${goldGain} 골드를 획득했습니다!`,
//     //     Colors.exp
//     //   );
//     //   await Delay(3000);
//     // } else {
//     //   await TypeEffect("패배했습니다...", Colors.danger);
//     //   await Delay(3000);
//     //   process.exit();
//     // }

//     // await Delay(1500);
//     // EntranceHallScene();
//   }

//#endregion

//#region 전투 하위 처리 코드 백업

//#region 플레이어 턴
async function playerTurn(enemy) {
  console.log(Colors.spell("사용할 주문을 선택하세요:"));

  const spellChoices = playerState.spells
    .map(
      (spell) =>
        `${spell} (데미지: ${SPELLS[spell].damage} 마나: ${SPELLS[spell].manaCost})`
    )
    .join(",");

  await handleTurn(spellChoices, async (spell) => {
    if (spell === "도망가기") {
      if (GetRandomChance(30)) {
        await typeEffect(
          `${spell} 30% 확률을 뚫고 성공했습니다.`,
          Colors.danger
        );
        await delay(2500);
        entranceHallScene();
        return;
      } else {
        await typeEffect(`${spell}를 실패했습니다.`, Colors.danger);
      }
    }

    if (player.mana >= SPELLS[spell].manaCost) {
      const damage = CalculateDamage(
        Math.floor(
          SPELLS[spell].damage * (1 + player.stats.intelligence * 0.1)
        ),
        player
      );

      player.mana -= SPELLS[spell].manaCost;
      enemy.health -= damage;
      if (SPELLS[spell].state) applyStatusAilment(enemy, SPELLS[spell].state);
      await typeEffect(
        `${spell} 주문으로 ${damage}의 피해를 입혔습니다!`,
        Colors.success
      );
    } else {
      await typeEffect("마나가 부족합니다!", Colors.danger);
    }
  });
}
//#endregion

//#region 적 턴
async function enemyTurn() {
  console.log(Colors.danger("\n[ 적의 차례 ]"));
  await delay(1000);

  if (await checkAndHandleState(enemy, "기절")) {
    return; // 기절 상태일 경우 종료
  }

  const enemySpell = enemy.selectSpell();
  if (enemySpell) {
    const damage = CalculateDamage(
      Math.floor(SPELLS[enemySpell].damage * (1 + enemy.level * 0.1)),
      enemy
    );
    enemy.mana -= SPELLS[enemySpell].manaCost;
    player.health -= damage;
    if (SPELLS[enemySpell].state) {
      applyStatusAilment(player, SPELLS[enemySpell].state);
    }
    await typeEffect(
      `${enemy.name}의 ${enemySpell} 주문! ${damage}의 피해를 입었습니다!`,
      Colors.danger
    );
  } else {
    await typeEffect(
      `${enemy.name}는 마나가 부족하여 공격하지 못했습니다!`,
      Colors.info
    );
  }
}

//#endregion

//#region 턴 공동처리 함수
async function handleTurn(spellChoices, action) {
  const playerTurn = new Promise((resolve) => {
    handleChoice(
      playerState.spells.reduce((acc, spell, index) => {
        acc[index + 1] = async () => {
          await action(spell);
          resolve(true);
        };
        return acc;
      }, {}),
      spellChoices
    );
  });

  await playerTurn;
}
//#endregion

//#region 상태체크 및 처리 함수
async function checkAndHandleState(target, state) {
  if (isState(target, state)) {
    await typeEffect(
      `${target.name}는 ${state} 상태로 인해 행동할 수 없습니다!`,
      Colors.danger
    );
    return true; // 상태가 활성화되어 있으면 true 반환
  }
  return false; // 상태가 비활성화되어 있으면 false 반환
}
//#endregion

//#endregion

//#region 훈련장

async function TrainingGroundScene() {
  Clear();
  await TypeEffect("훈련장에 입장했습니다.", Colors.info);
  await HandleChoice(
    {
      1: async () => {
        playerState.stats.strength += 1;
        await TypeEffect("힘이 1 증가했습니다!", Colors.success);
      },
      2: async () => {
        playerState.stats.intelligence += 1;
        await TypeEffect("지능이 1 증가했습니다!", Colors.success);
      },
      3: async () => {
        playerState.stats.wisdom += 1;
        await TypeEffect("지혜가 1 증가했습니다!", Colors.success);
      },
    },
    "체력 훈련,마법력 훈련,정신력 훈련"
  );
  await Delay(1000);
  EntranceHallScene();
}

//#endregion

//#region 상점 이전 코드 백업

// async function StoreScene() {
//   Clear();
//   await TypeEffect("마법 상점에 입장했습니다.", Colors.info);
//   await HandleChoice(
//     {
//       1: async () => {
//         if (playerState.gold >= 100) {
//           playerState.gold -= 100;
//           playerState.maxHealth += 50;
//           playerState.health = playerState.maxHealth;
//           await TypeEffect("최대 체력이 50 증가했습니다!", Colors.success);
//         } else {
//           await TypeEffect("골드가 부족합니다!", Colors.danger);
//         }
//       },
//       2: async () => {
//         if (playerState.gold >= 100) {
//           playerState.gold -= 100;
//           playerState.maxMana += 30;
//           playerState.mana = playerState.maxMana;
//           await TypeEffect("최대 마나가 30 증가했습니다!", Colors.success);
//         } else {
//           await TypeEffect("골드가 부족합니다!", Colors.danger);
//         }
//       },
//     },
//     "체력 영약 구매 (100G),마법의 영약 구매 (100G)"
//   );
//   await Delay(1000);
//   EntranceHallScene();
// }

//#endregion

//#region 상점

//#region 상점 제품 리스트
const items = [
  {
    id: 1,
    name: "체력 영약",
    cost: 100,
    effect: (player) => {
      player.maxHealth += 50;
      player.health = player.maxHealth;
      return "최대 체력이 50 증가했습니다!";
    },
  },
  {
    id: 2,
    name: "마법의 영약",
    cost: 100,
    effect: (player) => {
      player.maxMana += 30;
      player.mana = player.maxMana;
      return "최대 마나가 30 증가했습니다!";
    },
  },
  {
    id: 3,
    name: "경험치 영약",
    cost: 100,
    effect: (player) => {
      player.expGain(500);
      return "경험치가 500 증가했습니다!";
    },
  },
  {
    id: 4,
    name: "꽁스킬",
    cost: 0,
    effect: (player) => {
      player.spells.push("꽁스킬");
      removeItemById(4);
      return "무료로 스킬을 드려요!";
    },
  },
];

//#endregion

//#region 상점 본점
//상점

async function StoreScene() {
  Clear();
  await TypeEffect("마법 상점에 입장했습니다.", Colors.info);

  const choices = items.map((item) => {
    return `${item.name} 구매 (${item.cost}G)`;
  });

  await HandleChoice(
    items.reduce((acc, item) => {
      acc[item.id] = async () => await purchaseItem(item);
      return acc;
    }, {}),
    choices.join(",")
  );

  await Delay(1000);
  EntranceHallScene();
}

//#endregion

//#region 아이템 구매
//아이템 구매
async function purchaseItem(item) {
  if (playerState.gold >= item.cost) {
    playerState.gold -= item.cost;
    const message = item.effect(playerState);
    await TypeEffect(message, Colors.success);
  } else {
    await TypeEffect("골드가 부족합니다!", Colors.danger);
  }
}
//#endregion

//#region 판매 아이템 제거
//아이템 제거
function removeItemById(itemId) {
  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items.splice(index, 1); // 배열에서 아이템 제거
  }
}
//#endregion

//#endregion

// Start Game
TitleScene();
