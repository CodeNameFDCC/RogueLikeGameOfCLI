import { Colors, highlightNumbers } from "./colors.js";
export class Logger {
  constructor(name, color = Colors.info) {
    this.name = name;
    this.color = color;
    this.queue = []; // 출력 큐
    this.isProcessing = false; // 현재 출력 중인지 여부
  }

  async Delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async TypeEffectWithHighlight(text, ms = 50) {
    const highlightedText = highlightNumbers(text);
    let i = 0;

    while (i < highlightedText.length) {
      const char = highlightedText[i];
      if (char === ",") {
        process.stdout.write(char + "\n");
        i++;
      } else {
        process.stdout.write(char);
        i++;
      }
      await this.Delay(ms);
    }
    console.log();
  }

  async log(message) {
    await this.enqueue(`[${this.name}] ${highlightNumbers(message)}`);
  }

  async createTypingEffect(text, ms = 50) {
    await this.enqueue(text, ms);
  }

  async enqueue(text, ms = 50) {
    this.queue.push({ text, ms });
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const { text, ms } = this.queue.shift();
      await this.TypeEffectWithHighlight(text, ms);
    }
    this.isProcessing = false;
  }
}
