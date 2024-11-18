import { stringColors } from "../data/stringcolors.js";
import { Colors } from "./color.js";

// Log.js
export class Log {
  constructor(name) {
    this.name = name; // 로그의 이름
    this.entries = []; // 로그 항목을 저장하는 배열
  }

  add(entry) {
    this.entries.push(entry); // 새로운 로그 항목 추가
  }

  clear() {
    this.entries = [];
  }

  async display(next) {
    if (this.entries.length === 0) {
      console.log(`${this.name} 로그가 비어 있습니다.`);
      return;
    }

    console.log(`로그 (${this.name}):`);

    // 각 로그 항목에 대해 타이핑 효과 적용
    for (const [index, entry] of this.entries.entries()) {
      await TypeEffect(`${index + 1}: ${entry}`, next); // 각 항목에 대해 TypeEffect 적용
    }
    if (next) {
      next();
    }
  }
}

// Delay 함수
async function Delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 타이핑 효과
async function TypeEffect(text) {
  const defaultColor = Colors.info;
  const words = text.split(" "); // 공백으로 단어 분리

  for (let word of words) {
    let color = stringColors[word] || defaultColor; // 색상 결정
    for (let char of word) {
      // 숫자인 경우 기본 색상으로 출력
      if (!isNaN(char)) {
        color = Colors.warning; // 숫자는 기본 색상
      }
      await Delay(50);
      process.stdout.write(color(char)); // 색상 적용하여 출력
    }
    process.stdout.write(" "); // 단어 사이에 공백 추가
  }
  console.log(); // 줄 바꿈

  //다음 명령 실행
}

export function LogEffect(text) {
  const defaultColor = Colors.info;
  const words = text.split(" "); // 공백으로 단어 분리

  for (let word of words) {
    let color = stringColors[word] || defaultColor; // 색상 결정
    for (let char of word) {
      // 숫자인 경우 기본 색상으로 출력
      if (!isNaN(char)) {
        color = Colors.warning; // 숫자는 기본 색상
      }
      process.stdout.write(color(char)); // 색상 적용하여 출력
    }
    process.stdout.write(" "); // 단어 사이에 공백 추가
  }
  console.log(); // 줄 바꿈
  // 다음 명령 실행
}
