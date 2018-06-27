import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      output: 'press a button',
      linearData: [89, 30, 25, 32, 72, 70],
      whichBtn: null
    };
  }
  
  linearSearch(dataset, item) {
    let count;
    for (let i = 0; i < dataset.length; i++) {
      let currItem = dataset[i];
      count = i;
      if (currItem === item) {
        return currItem;
      }
    }
    this.setState({output: `Found ${item}, Took ${count} Searches`});
    return 'The number was not found';
  }

  binarySearch() {

  }

  // write submit func
  //  checks name val of btn "submitted"
  //  grabs val of textarea
  //  stores val in state
  //  runs the func

  onFormSubmit(e, btnName) {
    e.preventDefault();
    console.log(btnName);
  }
  
  render() {
    return (
      <form className="App" onSubmit={(event) => 
        this.onFormSubmit(event, this.state.whichBtn)}>
        <textarea></textarea>
        <button type="submit" name="linear_search_btn" 
          onClick={() => this.setState({whichBtn: 'linear'})}>Linear Search</button>
        <button type="submit" name="binary_search_btn" 
          onClick={() => this.setState({whichBtn: 'binary'})}>Binary Search</button>
        <p>Output: {this.state.output}</p>
      </form>
    );
  }
}

export default App;
