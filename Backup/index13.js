import chalk from "chalk";
import readlineSync from "readline-sync";
import figlet from "figlet";

// Color Functions
const Colors = {
  spell: (str) => chalk.cyan(`${str}`),
  danger: (str) => chalk.red.bold(`${str}`),
  success: (str) => chalk.green(`${str}`),
  warning: (str) => chalk.yellow(`${str}`),
  magic: (str) => chalk.magenta.bold.italic(`${str}`),
  info: (str) => chalk.blue(`${str}`),
  exp: (str) => chalk.yellow.bold(`${str}`),
};

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

// Skill Definitions
const SPELLS = {
  루모스: { damage: 10, manaCost: 5, level: 1, description: "기본 빛 마법" },
  인센디오: { damage: 25, manaCost: 15, level: 3, description: "화염 마법" },
  스투페파이: { damage: 40, manaCost: 25, level: 5, description: "기절 마법" },
  엑스펠리아무스: {
    damage: 60,
    manaCost: 35,
    level: 7,
    description: "무장해제 마법",
  },
  아바다케다브라: {
    damage: 100,
    manaCost: 50,
    level: 10,
    description: "죽음의 마법",
  },
};

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
  spells: ["루모스"],
  gold: 0,
  stats: {
    strength: 1,
    intelligence: 1,
    wisdom: 1,
  },
};

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

function GainExp(amount) {
  playerState.exp += amount;
  while (playerState.exp >= playerState.expToNext) {
    LevelUp();
  }
}

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
    "마법 수업장으로 이동,도서관으로 이동,결투장으로 이동,훈련장으로 이동,상점으로 이동"
  );
}

async function SpellClassScene() {
  Clear();
  await TypeEffect("마법 수업장에 입장했습니다.", Colors.spell);
  const expGain = 20;
  GainExp(expGain);
  await TypeEffect(`수업을 통해 ${expGain} 경험치를 획득했습니다!`, Colors.exp);
  await Delay(1000);
  EntranceHallScene();
}

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

async function DuelArenaScene() {
  Clear();
  await TypeEffect(
    "결투장에 입장했습니다! 상대 마법사가 나타났습니다!",
    Colors.danger
  );

  // 전투 시스템
  console.log(Colors.magic("\n사용할 주문을 선택하세요:"));
  const spellChoices = playerState.spells
    .map(
      (spell, index) =>
        `${spell} (데미지: ${SPELLS[spell].damage} 마나: ${SPELLS[spell].manaCost})`
    )
    .join(",");

  await HandleChoice(
    playerState.spells.reduce((acc, spell, index) => {
      acc[index + 1] = async () => {
        if (playerState.mana >= SPELLS[spell].manaCost) {
          const damage =
            SPELLS[spell].damage * (1 + playerState.stats.intelligence * 0.1);
          playerState.mana -= SPELLS[spell].manaCost;
          await TypeEffect(
            `${spell} 주문으로 ${Math.floor(damage)}의 피해를 입혔습니다!`,
            Colors.success
          );

          // 적의 반격
          const enemyDamage = Math.floor(Math.random() * 20) + 10;
          playerState.health -= enemyDamage;
          await TypeEffect(
            `상대의 공격으로 ${enemyDamage}의 피해를 입었습니다!`,
            Colors.danger
          );

          const expGain = 50;
          const goldGain = Math.floor(Math.random() * 30) + 20;
          GainExp(expGain);
          playerState.gold += goldGain;
          await TypeEffect(
            `결투에서 승리! ${expGain} 경험치와 ${goldGain} 골드를 획득했습니다!`,
            Colors.exp
          );
        } else {
          await TypeEffect("마나가 부족합니다!", Colors.danger);
        }
      };
      return acc;
    }, {}),
    spellChoices
  );

  if (playerState.health <= 0) {
    await TypeEffect("패배했습니다...", Colors.danger);
    process.exit();
  }

  await Delay(1000);
  EntranceHallScene();
}

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
    "체력 물약 구매 (100G),마나 물약 구매 (100G)"
  );
  await Delay(1000);
  EntranceHallScene();
}

// Start Game
TitleScene();
