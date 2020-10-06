import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
  this.state = {
    word1 : '', 
    word2 : '',
    anagram : 'Enter two words to check if they are anagrams',
  }
  this.word1Change = this.word1Change.bind(this);
  this.word2Change = this.word2Change.bind(this);
  this.checkAnagram = this.checkAnagram.bind(this);
  this.checkPopular = this.checkPopular.bind(this);
}

  word1Change(event){
    this.setState({word1: event.target.value})
  }

  word2Change(event) {
    this.setState({word2: event.target.value})
  }

  async checkAnagram() {
    
    axios.post('/api', {
      word1: this.state.word1,
      word2: this.state.word2,
    })
            .then(response => {
              if (response.data == "1") {
                this.setState({anagram : "These words are anagrams"})
                //console.log(this.state.anagram)
              }
              else {
                this.setState({anagram : "These words are not anagrams"})
              }
            
              
              
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
 


  }

  async checkPopular() {
    axios.post('/popular')
    .then(response => {
      var result = response.data[0]
      for (var i = 1; i < response.data.length; i++) {
          result += ", " + response.data[i]
      }

      console.log(result)
      this.setState({anagram : "The most popular searches are " + result})
    })
    .catch(function(error){
            console.log(error)
      });
  }
  
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>
          Word 1 
          <input type="text" value={this.state.word1} onChange={this.word1Change} />
        </label>
         <label>
          Word 2 
          <input type="text" value={this.state.word2} onChange={this.word2Change} />
        </label>
        <button onClick={this.checkAnagram}> Anagram </button>
        <button onClick={this.checkPopular}> Popular Searches </button>
        <p>
        {this.state.anagram}
        </p>
      </header>
    </div>
  );
}
}


export default App;
