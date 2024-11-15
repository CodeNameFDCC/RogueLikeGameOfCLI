const readline = require("readline");

class GameEntity {
  constructor(x, y, symbol) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }
}

class Player extends GameEntity {
  constructor(x, y) {
    super(x, y, "@");
    this.health = 100;
    this.attack = 10;
    this.defense = 5;
    this.gold = 0;
  }

  takeDamage(amount) {
    this.health -= amount;
  }

  attack(enemy) {
    const damage = Math.max(this.attack - enemy.defense, 1);
    enemy.takeDamage(damage);
    console.log(`You attacked the ${enemy.symbol} for ${damage} damage!`);
  }
}

class Monster extends GameEntity {
  constructor(x, y, symbol, health, attack, defense) {
    super(x, y, symbol);
    this.health = health;
    this.attack = attack;
    this.defense = defense;
  }

  takeDamage(amount) {
    this.health -= amount;
  }

  attack(player) {
    const damage = Math.max(this.attack - player.defense, 1);
    player.takeDamage(damage);
    console.log(`The ${this.symbol} attacked you for ${damage} damage!`);
  }

  isDead() {
    return this.health <= 0;
  }
}

class Item extends GameEntity {
  constructor(x, y, symbol, effect) {
    super(x, y, symbol);
    this.effect = effect;
  }

  apply(player) {
    this.effect(player);
    console.log(`You found a ${this.symbol} item!`);
  }
}

class Game {
  constructor() {
    this.width = 30;
    this.height = 20;
    this.map = [];
    this.player = new Player(1, 1);
    this.monsters = [];
    this.items = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  initializeMap() {
    for (let y = 0; y < this.height; y++) {
      this.map[y] = [];
      for (let x = 0; x < this.width; x++) {
        if (
          y === 0 ||
          y === this.height - 1 ||
          x === 0 ||
          x === this.width - 1
        ) {
          this.map[y][x] = "#";
        } else {
          this.map[y][x] = ".";
        }
      }
    }

    // Place player
    this.map[this.player.y][this.player.x] = this.player.symbol;

    // Place monsters
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(Math.random() * (this.width - 2)) + 1;
      const y = Math.floor(Math.random() * (this.height - 2)) + 1;
      const monster = new Monster(x, y, "M", 50, 10, 5);
      this.monsters.push(monster);
      this.map[y][x] = monster.symbol;
    }

    // Place items
    for (let i = 0; i < 3; i++) {
      const x = Math.floor(Math.random() * (this.width - 2)) + 1;
      const y = Math.floor(Math.random() * (this.height - 2)) + 1;
      const item = new Item(x, y, "H", (player) => {
        player.health = Math.min(player.health + 20, 100);
        console.log("You found a health potion!");
      });
      this.items.push(item);
      this.map[y][x] = item.symbol;
    }
  }

  render() {
    console.clear();
    console.log(`Health: ${this.player.health} | Gold: ${this.player.gold}`);
    console.log("Commands: w(up), s(down), a(left), d(right), q(quit)");

    for (let y = 0; y < this.height; y++) {
      let row = "";
      for (let x = 0; x < this.width; x++) {
        const entity = this.getEntityAt(x, y);
        row += entity ? entity.symbol : this.map[y][x];
      }
      console.log(row);
    }
  }

  getEntityAt(x, y) {
    for (const monster of this.monsters) {
      if (monster.x === x && monster.y === y) {
        return monster;
      }
    }
    for (const item of this.items) {
      if (item.x === x && item.y === y) {
        return item;
      }
    }
    if (this.player.x === x && this.player.y === y) {
      return this.player;
    }
    return null;
  }

  movePlayer(direction) {
    let newX = this.player.x;
    let newY = this.player.y;
    switch (direction) {
      case "w":
        newY--;
        break;
      case "s":
        newY++;
        break;
      case "a":
        newX--;
        break;
      case "d":
        newX++;
        break;
    }

    if (this.map[newY][newX] === "#") {
      return;
    }

    const entity = this.getEntityAt(newX, newY);
    if (entity) {
      if (entity instanceof Monster) {
        this.player.attack(entity);
        if (entity.isDead()) {
          this.player.gold += 10;
          this.removeEntity(entity);
        }
      } else if (entity instanceof Item) {
        entity.apply(this.player);
        this.removeEntity(entity);
      }
    } else {
      this.map[this.player.y][this.player.x] = ".";
      this.player.x = newX;
      this.player.y = newY;
      this.map[this.player.y][this.player.x] = this.player.symbol;
    }
  }

  removeEntity(entity) {
    if (entity instanceof Monster) {
      this.monsters = this.monsters.filter((m) => m !== entity);
    } else if (entity instanceof Item) {
      this.items = this.items.filter((i) => i !== entity);
    }
    this.map[entity.y][entity.x] = ".";
  }

  checkGameOver() {
    if (this.player.health <= 0) {
      console.log("Game Over!");
      return true;
    }
    if (this.monsters.length === 0) {
      console.log("You win!");
      return true;
    }
    return false;
  }

  async start() {
    this.initializeMap();
    this.render();

    while (true) {
      const input = await new Promise((resolve) => {
        this.rl.question("Enter your action: ", (answer) => {
          resolve(answer.toLowerCase());
        });
      });

      if (input === "q") {
        console.log("Goodbye!");
        break;
      }

      if (["w", "a", "s", "d"].includes(input)) {
        this.movePlayer(input);
        this.render();
        if (this.checkGameOver()) {
          break;
        }
      }
    }

    this.rl.close();
  }
}

const game = new Game();
game.start();
