class Queue {
  constructor(field, queue = []) {
    this.field = field;
    if (!Array.isArray(queue)) queue = [];
    this.queue = queue;
  }

  enqueue(item) {
    this.checkQueue();

    if (Array.isArray(item)) {
      this.queue.push(...item);
    } else {
      this.queue.push(item);
    }
  }
  dequeue() {
    this.checkQueue();
    if (this.queue.length === 0)
      return console.log(`there are no items in the queue`);
    return this.queue.shift();
  }

  checkQueue() {
    if (!this.queue) throw new Error(`the queue needs to be initialized first`);
  }

  list() {
    return this.queue;
  }
}

module.exports = Queue;
