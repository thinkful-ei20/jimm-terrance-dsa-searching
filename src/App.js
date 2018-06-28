import React, { Component } from 'react';
import './App.css';
import BST from './BST';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      output: 'press a button',
      whichBtn: null,
      data: [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5],
      searchFor: 0,
      count: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.binarySearch = this.binarySearch.bind(this);
  }
  
  linearSearch(dataset, item) {
    let count;
    let found = false;
    for (let i = 0; i < dataset.length; i++) {
      let currItem = dataset[i];
      count = i+1;
      if (currItem === item) {
        found = true;
        break;
      }
    }
    if(found){
      this.setState({output: `Found ${item}, Took ${count} Searches`});            
    } else {
      this.setState({output: 'The number was not found'});            
    }
    return;
  }

  handleBinarySearch() {
    let data = this.state.data.map(item => item);
    data.sort((a, b) => {
      return a - b;
    });
    const foundVal = this.binarySearch(data, this.state.searchFor);
    console.log(foundVal);
    if(foundVal !== -1){
      this.setState({output: `Found ${foundVal}, Took ${this.state.count} Searches`});
      this.setState({count: 0});            
    } else {
      this.setState({output: 'The number was not found'});            
    }
  }

  binarySearch(sorted, value, start, end) {
    let startPoint = start === undefined ? 0 : start;
    let endPoint = end === undefined ? sorted.length : end;

    if (startPoint > endPoint) {
      return -1;
    }
    const index = Math.floor((startPoint + endPoint) / 2);
    const item = sorted[index];

    if (item === value) {
      this.setState({count: this.state.count += 1});
      return item;
    }
    else if (item < value) {
      this.setState({count: this.state.count += 1});
      return this.binarySearch(sorted, value, index + 1, endPoint);
    }
    else if (item > value) {
      this.setState({count: this.state.count += 1});
      return this.binarySearch(sorted, value, startPoint, index - 1);
    }
  }

  handleChange(e) {
    let data = e.target.value.trim().split(' ').map(str => {
      return parseInt(str, 10);
    });
    this.setState({data: data});
  }

  handleNumberChange(e) {
    this.setState({searchFor: parseInt(e.target.value, 10)});    
  }
  
  createBST(){
    const bst = new BST();
    for(let i = 0; i < this.state.data.length; i++){
      bst.insert(this.state.data[i], '');
    }
    return bst;
  }

  // Determines which submit button was used and executes appropriate function
  onFormSubmit(e) {
    e.preventDefault();
    if(this.state.whichBtn === 'linear'){
      this.linearSearch(this.state.data, this.state.searchFor);
    }else if(this.state.whichBtn === 'binary'){
      this.handleBinarySearch(this.state.data);
    }else if (this.state.whichBtn === 'random'){
      const index = Math.floor(Math.random()*this.state.data.length);
      this.setState({searchFor: this.state.data[index]})
    } else if(this.state.whichBtn === 'pre-order'){
      const bst = this.createBST();
      let arr = [];
      bst.preOrder(arr);
      if(arr.length > 20){
        arr = `${arr.splice(0,9)}, ... ${arr.splice(arr.length-10)}`;
      }
      this.setState({output: `Created Array: ${arr}`});
    } else if(this.state.whichBtn === 'in-order'){
      const bst = this.createBST();
      let arr = [];
      bst.inOrder(arr);
      if(arr.length > 20){
        arr = `${arr.splice(0,9)}, ... ${arr.splice(arr.length-10)}`;
      }
      this.setState({output: `Created Array: ${arr}`});
    } else if(this.state.whichBtn === 'post-order'){
      const bst = this.createBST();
      let arr = [];
      bst.postOrder(arr);
      if(arr.length > 20){
        arr = `${arr.splice(0,9)}, ... ${arr.splice(arr.length-10)}`;
      }
      this.setState({output: `Created Array: ${arr}`});
    }
  }
  
  render() {

    return (
      <form className="App" onSubmit={(event) => 
        this.onFormSubmit(event)}>
        <textarea defaultValue={'89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'}
          onChange={this.handleChange}></textarea>

        <input type='number' value={this.state.searchFor} placeholder="Enter your search here" 
          onChange={this.handleNumberChange} />

        <button type="submit" name="random_btn" 
          onClick={() => this.setState({whichBtn: 'random'})}>Random Number</button>

        <button type="submit" name="linear_search_btn" 
          onClick={() => this.setState({whichBtn: 'linear'})}>Linear Search</button>

        <button type="submit" name="binary_search_btn" 
          onClick={() => this.setState({whichBtn: 'binary'})}>Binary Search</button>

        <button type="submit" name="pre_order_traversal_btn" 
          onClick={() => this.setState({whichBtn: 'pre-order'})}>Pre Order Traversal</button>

        <button type="submit" name="in_order_traversal_btn" 
          onClick={() => this.setState({whichBtn: 'in-order'})}>In Order Traversal</button>

        <button type="submit" name="post_order_traversal_btn" 
          onClick={() => this.setState({whichBtn: 'post-order'})}>Post Order Traversal</button>  

        <p>Output: {this.state.output}</p>
      </form>
    );
  }
}

export default App;
