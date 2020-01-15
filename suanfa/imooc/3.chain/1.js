class Node {
  constructor(value) {
    this.val = value;
    this.next = undefined;
  }
}

// 链表数据结构 
class NodeList {
  constructor(arr) {
    let head = new Node(arr.shift());
    let next = head;
    arr.forEach(item => {
      next.next = new Node(item)
      next = next.next
    });
    return head;
  }
}