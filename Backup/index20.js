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
  인센디오: {
    damage: 25,
    manaCost: 15,
    level: 3,
    description: "화염 마법",
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
  },
  도망가기: {
    damage: 0,
    manaCost: 0,
    level: 1,
    description: "36계 줄 행 랑",
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
  await TypeEffect("마법 교실에 입장했습니다.", Colors.spell);
  const expGain = 20;
  GainExp(expGain);
  await TypeEffect(`수업을 통해 ${expGain} 경험치를 획득했습니다!`, Colors.exp);
  await Delay(1000);
  EntranceHallScene();
}
//#endregion

//#region 도서관
async function LibraryScene() {
  Clear();
  await TypeEffect("고대의 마법서들이 즐비한 도서관입니다.", Colors.info);
  playerState.mana += 20;
  if (playerState.mana > playerState.maxMana)
    playerState.mana = playerState.maxMana;
  playerState.stats.wisdom += 1;
  await TypeEffect(
    "마법서를 읽어 마나가 회복되고 지혜가 1 증가했습니다.",
    Colors.success
  );
  await Delay(1000);
  EntranceHallScene();
}

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
function calculateDamage(baseDamage, attacker) {
  let damage = baseDamage;

  // 공격자가 약화 상태라면 데미지 감소
  if (attacker.weakened) {
    damage = Math.floor(damage * 0.7); // 30% 데미지 감소
  }

  return damage;
}

//#endregion

//#region 전투

async function DuelArenaScene() {
  Clear();
  await TypeEffect("결투장에 입장했습니다!", Colors.danger);

  // 적 생성
  const enemy = new Enemy(Math.max(1, playerState.level - 1));
  await TypeEffect(`${enemy.name}가 나타났다!`, Colors.danger);

  // 전투 루프
  while (enemy.health > 0 && playerState.health > 0) {
    Clear();
    DisplayBattleStatus(enemy);

    // 상태이상 처리
    await ProcessStatusAilments(playerState);
    await ProcessStatusAilments(enemy);

    // 플레이어 턴
    console.log(Colors.magic("\n[ 당신의 차례 ]"));

    // 기절 상태 체크
    if (isState(playerState, "기절")) {
      await TypeEffect("기절 상태로 인해 행동할 수 없습니다!", Colors.danger);
      await Delay(1000);
    } else {
      console.log(Colors.spell("사용할 주문을 선택하세요:"));
      const spellChoices = playerState.spells
        .map(
          (spell) =>
            `${spell} (데미지: ${SPELLS[spell].damage} 마나: ${SPELLS[spell].manaCost})`
        )
        .join(",");

      const playerTurn = new Promise((resolve) => {
        HandleChoice(
          playerState.spells.reduce((acc, spell, index) => {
            acc[index + 1] = async () => {
              if (spell === "도망가기") {
                if (GetRandomChance(30)) {
                  await TypeEffect(
                    `${spell} 30% 확률을 뚫고 성공했습니다.`,
                    Colors.danger
                  );
                  await Delay(2500);
                  EntranceHallScene();
                  return;
                } else {
                  await TypeEffect(`${spell} 를 실패 했습니다.`, Colors.danger);
                }
              }

              if (playerState.mana >= SPELLS[spell].manaCost) {
                const damage = calculateDamage(
                  Math.floor(
                    SPELLS[spell].damage *
                      (1 + playerState.stats.intelligence * 0.1)
                  ),
                  playerState
                );

                playerState.mana -= SPELLS[spell].manaCost;
                enemy.health -= damage;
                if (SPELLS[spell].state)
                  ApplyStatusAilment(enemy, SPELLS[spell].state);
                await TypeEffect(
                  `${spell} 주문으로 ${damage}의 피해를 입혔습니다!`,
                  Colors.success
                );
                resolve(true);
              } else {
                await TypeEffect("마나가 부족합니다!", Colors.danger);
                resolve(false);
              }
            };
            return acc;
          }, {}),
          spellChoices
        );
      });

      await playerTurn;
    }

    // 적 턴
    if (enemy.health > 0) {
      console.log(Colors.danger("\n[ 적의 차례 ]"));
      await Delay(1000);

      // 기절 상태 체크
      if (isState(enemy, "기절")) {
        await TypeEffect(
          `${enemy.name}는 기절 상태로 인해 행동할 수 없습니다!`,
          Colors.danger
        );
      } else {
        const enemySpell = enemy.selectSpell();
        if (enemySpell) {
          const damage = calculateDamage(
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
      }

      await Delay(1000);
    }
    await Delay(1000);
  }

  // 전투 결과 처리
  if (playerState.health > 0) {
    const expGain = 50 + enemy.level * 10;
    const goldGain = Math.floor(Math.random() * 30) + enemy.level * 20;
    GainExp(expGain);
    playerState.gold += goldGain;
    await TypeEffect(
      `결투에서 승리! ${expGain} 경험치와 ${goldGain} 골드를 획득했습니다!`,
      Colors.exp
    );
    await Delay(3000);
  } else {
    await TypeEffect("패배했습니다...", Colors.danger);
    await Delay(3000);
    process.exit();
  }

  await Delay(1500);
  EntranceHallScene();
}

//#endregion

//#region 전투

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
      const damage = calculateDamage(
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
    const damage = calculateDamage(
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

//#region 상점

async function StoreScene() {
  Clear();
  await TypeEffect("마법 상점에 입장했습니다.", Colors.info);
  await HandleChoice(
    {
      1: async () => {
        if (playerState.gold >= 100) {
          playerState.gold -= 100;
          playerState.maxHealth += 50;
          playerState.health = playerState.maxHealth;
          await TypeEffect("최대 체력이 50 증가했습니다!", Colors.success);
        } else {
          await TypeEffect("골드가 부족합니다!", Colors.danger);
        }
      },
      2: async () => {
        if (playerState.gold >= 100) {
          playerState.gold -= 100;
          playerState.maxMana += 30;
          playerState.mana = playerState.maxMana;
          await TypeEffect("최대 마나가 30 증가했습니다!", Colors.success);
        } else {
          await TypeEffect("골드가 부족합니다!", Colors.danger);
        }
      },
    },
    "체력 영약 구매 (100G),마법의 영약 구매 (100G)"
  );
  await Delay(1000);
  EntranceHallScene();
}

//#endregion
// Start Game
TitleScene();
