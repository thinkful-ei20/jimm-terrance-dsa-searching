class BST{
  constructor(key=null, value=null, parent=null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } 
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BST(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) { 
        this.right = new BST(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  preOrder(arr){
    arr.push(this.key);
    if (this.left) {
      this.left.preOrder(arr);
    }
    if (this.right) {
      this.right.preOrder(arr);
    }
  }

  inOrder(arr){
    if (this.left) {
      this.left.inOrder(arr);
    }
    arr.push(this.key);
    if (this.right) {
      this.right.inOrder(arr);
    }
  }

  postOrder(arr) {
    if (this.left) {
      this.left.postOrder(arr);
    }
    if (this.right) {
      this.right.postOrder(arr);
    }
    arr.push(this.key);
  }
}

export default BST;