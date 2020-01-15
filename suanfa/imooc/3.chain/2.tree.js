class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = undefined;
  }
}

class Tree {
  constructor(data) {
    let noteList = [];
    let root;
    for(let i = 0, len = data.length; i < len; i++) {
      let node = new Node(data[i]);
      noteList.push(node);
      
    }
  }
}
