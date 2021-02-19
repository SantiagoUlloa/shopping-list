import React, { Component } from 'react';
import Container from './Container';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

//components
import Signup from './Signup';
import Signin from './Signin';
import Button from '@material-ui/core/Button';
import './App.css';
import 'mdbreact/dist/css/mdb.css';
import background from './assets/grocery-cart.jpg'


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
            username: this.state.username,
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
            username: this.state.username,
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
      this.setState({
        isLoggedIn: false,
        username: '',
        password: '',
        token: ''})

    }

render(){
  return(
    
    <div className="App" style={{ backgroundImage: `url(${background})`, height:"100vh",
    backgroundPosition:"center", backgroundRepeat:"noRepeat", backgroundSize: "cover" }}>
      <Router>
      <Link className="home-link" to="/home">Home</Link>
      <Link className="login-link" to="/login">Login</Link>
      <Link className="register-link" to="/register">Register</Link>
      <Route exact path="/home" component={Container} />
      <Route path="/login" render={(props) => (
      <Signin {...props} 
        submitLogin = {this.submitLogin}
        handleUsernameChange = {this.handleUsernameChange}
        handlePasswordChange = {this.handlePasswordChange}
        username = {this.state.username}
        password = {this.state.password}
/>)} />
      <Route path="/register" render={(props) => (
      <Signup {...props}
        submitRegister = {this.submitRegister}
        handleUsernameChange = {this.handleUsernameChange}
        handlePasswordChange = {this.handlePasswordChange}
        username = {this.state.username}
        password = {this.state.password}
/>)}/>
      {this.state.isLoggedIn === true ? <Button className="log-out" onClick={this.handleLogout}>Log out</Button> : ''}
      {this.state.isLoggedIn === true ? <Button> Welcome {this.state.username}</Button>: ''}
    </Router>
    </div>
  )
}

}

export default App;
