import React, {Component} from 'react';
import '@/App.css';
import SearchApp from "@/searchApp/searchApp.js";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render(){
    const searchAppSL = new SearchApp()
    return searchAppSL.render()
  }


}

export default App;
