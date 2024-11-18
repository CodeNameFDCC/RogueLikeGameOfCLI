import chalk from "chalk";

//#region 색상 지정
// Color Functions
export const Colors = {
  spell: (str) => chalk.cyan(`${str}`),
  danger: (str) => chalk.red.bold(`${str}`),
  success: (str) => chalk.green(`${str}`),
  warning: (str) => chalk.yellow(`${str}`),
  magic: (str) => chalk.magentaBright.bold.italic(`${str}`),
  info: (str) => chalk.blue(`${str}`),
  exp: (str) => chalk.yellow.bold(`${str}`),
};
export const highlightNumbers = (text, color = Colors.danger) => {
  return text.replace(/(\d+)/g, (match) => color(match)); // 숫자를 초록색으로 변경
};
//#endregion
