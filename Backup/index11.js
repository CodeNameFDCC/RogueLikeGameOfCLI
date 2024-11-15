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

const wandArt = `
    /
    /
   /
  /
 /
/
|
|∆
|`;

// Game State
let playerState = {
  name: "",
  health: 100,
  mana: 100,
  spells: [],
  items: [],
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
  console.log(Colors.success(`체력: ${playerState.health}/100`));
  console.log(Colors.magic(`마나: ${playerState.mana}/100`));
  console.log(Colors.info("━".repeat(40)));
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
    `${playerState.name}님, 마법 학교의 입구에 도착했습니다.`,
    Colors.success
  );
  console.log(Colors.magic(wandArt));
  DisplayStats();

  await HandleChoice(
    {
      1: SpellClassScene,
      2: LibraryScene,
      3: DuelArenaScene,
    },
    "마법 수업장으로 이동,도서관으로 이동,결투장으로 이동"
  );
}

async function SpellClassScene() {
  Clear();
  await TypeEffect(
    "마법 수업장에 입장했습니다. 새로운 주문을 배울 수 있습니다.",
    Colors.spell
  );
  const newSpell = "루모스";
  playerState.spells.push(newSpell);
  await TypeEffect(`새로운 주문 '${newSpell}'을 배웠습니다!`, Colors.success);
  await Delay(1000);
  EntranceHallScene();
}

async function LibraryScene() {
  Clear();
  await TypeEffect("고대의 마법서들이 즐비한 도서관입니다.", Colors.info);
  playerState.mana += 20;
  if (playerState.mana > 100) playerState.mana = 100;
  await TypeEffect("마법서를 읽어 마나가 회복되었습니다.", Colors.success);
  await Delay(1000);
  EntranceHallScene();
}

async function DuelArenaScene() {
  Clear();
  await TypeEffect(
    "결투장에 입장했습니다! 상대 마법사가 나타났습니다!",
    Colors.danger
  );
  const damage = Math.floor(Math.random() * 30) + 10;
  playerState.health -= damage;
  await TypeEffect(
    `상대의 공격으로 ${damage}의 피해를 입었습니다!`,
    Colors.danger
  );

  if (playerState.health <= 0) {
    await TypeEffect("패배했습니다...", Colors.danger);
    process.exit();
  }

  await Delay(1000);
  EntranceHallScene();
}

// Start Game
TitleScene();
