import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deepLink: ''
    }
  }

  handleClick = () => {
    const { deepLink } = this.state;
    window.location.href = deepLink;

  }

  render() {
    const { deepLink } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input className="input" value={deepLink} onChange={(e) => {
          this.setState({deepLink: e.target.value})
        }} />
        <br />
        <button onClick={this.handleClick}>输入deeplink后点击跳转</button>
        
      </div>
    );
  }
}

export default App;
