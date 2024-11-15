export function Chance(input) {
  if (input > 0 && input <= 100) {
    const randomValue = Math.random() * 100; // 0에서 100 사이의 랜덤 값 생성
    return randomValue < input; // input 확률과 비교
  } else {
    console.log("확률은 0에서 100 사이의 숫자여야 합니다.");
    return null;
  }
}
export function range(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
