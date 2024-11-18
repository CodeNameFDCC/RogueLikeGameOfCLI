export function getRandomChance(percentage) {
  return Math.random() < percentage * 0.01;
}

export function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function getRandomElement(array) {
  const randomIndex = getRandomRange(0, array.length - 1);
  return array[randomIndex];
}
