import chalk from "chalk";

export const Colors = {
  spell: (str) => chalk.cyan(`${str}`),
  danger: (str) => chalk.red.bold(`${str}`),
  success: (str) => chalk.green(`${str}`),
  warning: (str) => chalk.yellow(`${str}`),
  magic: (str) => chalk.magentaBright.bold.italic(`${str}`),
  info: (str) => chalk.blue(`${str}`),
  exp: (str) => chalk.yellow.bold(`${str}`),
  primary: (str) => chalk.blueBright(`${str}`),
  secondary: (str) => chalk.gray(`${str}`),
  highlight: (str) => chalk.bgYellow.black(`${str}`),
  muted: (str) => chalk.dim(`${str}`),
  link: (str) => chalk.underline.blue(`${str}`),
  error: (str) => chalk.bgRed.white.bold(`${str}`),
  notice: (str) => chalk.bgCyan.black(`${str}`),
};
