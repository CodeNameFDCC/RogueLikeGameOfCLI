class Node {
  constructor(data) {
    this.head = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  getAt(index) {
    if (0 < index || this.size <= index) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return next;
  }
  add(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  insert(index, data) {
    let newNode = new Node(data);

    if (index < 0 || index >= this.size) {
      return;
    }
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      newNode.next = current;
      current.next = newNode;
    }
    this.size++;
  }
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      current.next = current.next.next;
    }
    this.size--;
  }
}
