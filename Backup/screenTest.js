const gameScreen = {
  title: "환영합니다! 나만의 게임",
  uiElements: [
    {
      type: "scoreboard",
      text: "점수: 0",
    },
    {
      type: "healthBar",
      text: "체력: [██████████]",
    },
  ],
  characters: [
    {
      name: "영웅",
      symbol: "★",
    },
    {
      name: "적",
      symbol: "☠",
    },
  ],
  textBox: {
    content: "여기에 대화나 메시지가 표시됩니다.",
  },
  notification: {
    content: "알림: 적이 나타났습니다!",
  },
  instructions: "이동: WASD, 공격: SPACE",
};

// 테두리 길이를 자동으로 계산하는 함수
function calculateBorderLength(content) {
  return content.length + 4; // 좌우 테두리와 공백 추가
}

// 게임 화면 출력 함수
function printGameScreen(screen) {
  // 제목과 UI 요소의 길이를 계산
  const titleLength = calculateBorderLength(screen.title);
  const scoreboardLength = calculateBorderLength(screen.uiElements[0].text);
  const healthBarLength = calculateBorderLength(screen.uiElements[1].text);
  const notificationLength = calculateBorderLength(screen.notification.content);
  const textBoxLength = calculateBorderLength(screen.textBox.content);
  const instructionsLength = calculateBorderLength(screen.instructions);

  // 최대 길이 결정
  const maxLength = Math.max(
    titleLength,
    scoreboardLength,
    healthBarLength,
    notificationLength,
    textBoxLength,
    instructionsLength,
    ...screen.characters.map((character) =>
      calculateBorderLength(`${character.symbol} (이름: ${character.name})`)
    )
  );

  const borderTop = "┌" + "─".repeat(maxLength - 2) + "┐";
  const borderBottom = "└" + "─".repeat(maxLength - 2) + "┘";
  const leftBorder = "│";

  console.log(borderTop);

  // 제목
  console.log(
    `${leftBorder} ${screen.title.padEnd(maxLength - 2)} ${leftBorder}`
  );

  // 점수판과 체력바 출력
  screen.uiElements.forEach((element) => {
    console.log(
      `${leftBorder} ${element.text.padEnd(maxLength - 2)} ${leftBorder}`
    );
  });

  // 알림창 출력
  console.log(borderTop); // 알림창 위쪽 테두리
  console.log(
    `${leftBorder} ${screen.notification.content.padEnd(
      maxLength - 2
    )} ${leftBorder}`
  );
  console.log(borderBottom); // 알림창 아래쪽 테두리

  // 캐릭터 출력
  screen.characters.forEach((character) => {
    console.log(
      `${leftBorder} ${character.symbol} (이름: ${character.name})`.padEnd(
        maxLength - 2
      ) + `${leftBorder}`
    );
  });

  // 텍스트 박스 출력
  console.log(borderTop);
  console.log(
    `${leftBorder} ${screen.textBox.content.padEnd(
      maxLength - 2
    )} ${leftBorder}`
  );
  console.log(borderBottom);

  // 조작 방법 출력
  console.log(
    `${leftBorder} ${screen.instructions.padEnd(maxLength - 2)} ${leftBorder}`
  );
  console.log(borderBottom);
}

// 게임 화면 출력
printGameScreen(gameScreen);
