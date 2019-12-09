import React, { Component } from 'react';
import './App.css';
import DynamicForm from "./components/DynamicForm";
import Data from "./data";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Dynamic Forms</h1>
        </header>
          <DynamicForm
            onSubmit={(data) => {console.log(data)}}
            config = {Data}
          />
      </div>
    );
  }
}

export default App;
