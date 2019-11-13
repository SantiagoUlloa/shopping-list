import React, { Component } from 'react';
import Container from './Container';
import Signup from './Signup';
import Signin from './Signin';
import Button from '@material-ui/core/Button';
import './App.css';
import 'mdbreact/dist/css/mdb.css';
import BackgroundImagePage from './BackgroundImagePage';


class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      username: "",
      password: "",
      token: "",
      isLoggedIn: false,
      logInClicked: false,
      registerClicked: false,
      logoutClicked:false
    }

  }

  submitRegister = (e) => {
      e.preventDefault(); //stops page refresh
      console.log('register submission form');

      fetch("http://localhost:8081/signup", {
        method: 'POST',
        headers: {
          'Accept' : 'application/json, text/plain, */*',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
        .then(res =>  res.json())
        .then(res => {
          console.log(res, "I got a response!")
          this.setState({
            username: "",
            password: "",
            token: res.token,
            isLoggedIn: true
          })
        })
        .catch(error => {
          console.log(error);
        })
    }

  submitLogin = (e) => {
      e.preventDefault(); //stops page refresh
      console.log('login submission form');

      fetch("http://localhost:8081/login", {
        method: 'POST',
        headers: {
          'Accept' : 'application/json, text/plain, */*',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
        .then(res =>  res.json())
        .then(res => {
          console.log(res, "I got a response!")
          this.setState({
            username: "",
            password: "",
            token: res.token,
            isLoggedIn: true
          })
        })
        .catch(error => {
          console.log(error);
        })
    }

    handleUsernameChange = (e) => {
      this.setState({username: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleLogInButtonClicked = (e) => {
      this.setState({logInClicked: !this.state.logInClicked})
    }

    handleRegisterButtonClicked = (e) => {
      this.setState({registerClicked: !this.state.registerClicked})
    }

    handleLogout= (e) => {
      this.setState({isLoggedIn: false})

    }

render(){
  return(
    <div className="App">
    <Button className="login-button" color="primary" onClick={this.handleLogInButtonClicked}>Log In</Button>
      {this.state.logInClicked ? <Signin
        submitLogin = {this.submitLogin}
        handleUsernameChange = {this.handleUsernameChange}
        handlePasswordChange = {this.handlePasswordChange}
        username = {this.state.username}
        password = {this.state.password}
      /> : ''}
      <Button className="register-button" color="primary" onClick={this.handleRegisterButtonClicked}>Register</Button>
      {this.state.registerClicked ? <Signup
        submitRegister = {this.submitRegister}
        handleUsernameChange = {this.handleUsernameChange}
        handlePasswordChange = {this.handlePasswordChange}
        username = {this.state.username}
        password = {this.state.password}
        /> : ''}
        {this.state.isLoggedIn === true ? <Button className="log-out" onClick={this.handleLogout}>Log out</Button> : ''}
      <Container/>
      <BackgroundImagePage/>
    </div>
  )
}

}

export default App;
