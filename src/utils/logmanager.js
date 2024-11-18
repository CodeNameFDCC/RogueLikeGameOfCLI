// LogManager.js
import { Log } from "./log.js";

export class LogManager {
  constructor() {
    this.logs = []; // 로그 인스턴스를 저장하는 배열
  }

  createLog(name) {
    const log = new Log(name);
    this.logs.push(log);
    return log; // 생성된 로그 인스턴스를 반환
  }

  getLog(name) {
    return this.logs.find((log) => log.name === name); // 이름으로 로그 인스턴스를 찾음
  }
}
