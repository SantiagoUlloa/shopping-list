import React, { Component } from 'react';
import Container from './Container';
import Signup from './Signup';
import Signin from './Signin'
import './App.css'
import 'mdbreact/dist/css/mdb.css'
import BackgroundImagePage from './BackgroundImagePage'

class App extends Component {
  constructor(props) {
    super(props);
  }

render(){
  return(
    <div className="App">
      <Container/>
      <BackgroundImagePage/>
    </div>
  )
}

}

export default App;
