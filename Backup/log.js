import chalk from "chalk";
import figlet from "figlet";
import readlineSync from "readline-sync";

export function test() {
  console.log("test now!!");
}

export function clear() {
  console.clear();
}

export function title(str) {
  console.log(
    chalk.cyan(
      figlet.textSync(str, {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
}
export function line() {
  const line = chalk.magentaBright("=".repeat(50));
  console.log(line);
}

export function question(str) {
  console.log(chalk.green(str));
}

export function manu(num, str) {
  console.log(chalk.blue(`${num}.`) + chalk.bold.whiteBright(`${str}`));
}

export function input() {
  return readlineSync.question(chalk.bold.yellowBright("당신의 선택은? "));
}

export function description(str) {
  console.log(chalk.yellowBright.bold(str));
}

export function subdescription(str) {
  console.log(chalk.gray(str));
}

export function space(num = 1) {
  for (let index = 0; index < num; index++) {
    console.log();
  }
}

export function text(str) {
  console.log(chalk.green(str));
}

export function damageText(my, target, damage) {
  return `${chalk.green(my)} ${chalk.red(target)} ${chalk.yellowBright(
    damage
  )}`;
}

export function info(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  for (const key in obj) {
    const value = obj[key];
    process.stdout.write(
      `${chalk.yellowBright("|")} ${chalk.blueBright(
        key.toUpperCase()
      )} : ${chalk.yellow(value)}${chalk.yellowBright("|")} `
    );
  }
  console.log();
}

export function delay(time) {
  waiter(time * 1000);
}

async function waiter(ms) {
  await waittime(ms); // 2초 대기
}

function waittime(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
