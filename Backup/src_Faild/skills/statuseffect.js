import { Logger } from "../utils/log.js"; // Logger 클래스를 가져옵니다.

export class StatusEffect {
  constructor(name, duration, logger) {
    this.name = name; // 상태이상 이름
    this.duration = duration; // 지속 턴 수
    this.logger = logger; // Logger 인스턴스
  }

  async apply(target) {
    await this.logger.createTypingEffect(
      `${target.name}에게 ${this.name} 상태이상이 적용되었습니다. (${this.duration}턴 지속)`
    ); // 타이핑 효과로 메시지 출력
    target.applyStatusEffect(this);
  }
}
