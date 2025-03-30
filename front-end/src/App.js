import React, { Component } from 'react';
import Container from './Container';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

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
      logoutClicked: false,
      redirectToHome: false,
      authError: null
    }
  }

  verifyToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() < expirationTime;
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  }

  submitRegister = (e) => {
      e.preventDefault();
      this.setState({ authError: null });

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
        .then(res => {
          if (!res.ok) {
            throw new Error('Registration failed');
          }
          return res.json();
        })
        .then(res => {
          localStorage.setItem('token', res.token);
          this.setState({
            username: this.state.username,
            password: "",
            token: res.token,
            isLoggedIn: true,
            redirectToHome: true
          });
        })
        .catch(error => {
          this.setState({ authError: error.message });
          console.error('Registration error:', error);
        });
    }

  submitLogin = (e) => {
      e.preventDefault();
      this.setState({ authError: null });

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
        .then(res => {
          if (!res.ok) {
            throw new Error('Login failed');
          }
          return res.json();
        })
        .then(res => {
          localStorage.setItem('token', res.token);
          this.setState({
            username: this.state.username,
            password: "",
            token: res.token,
            isLoggedIn: true,
            redirectToHome: true
          });
        })
        .catch(error => {
          this.setState({ authError: error.message });
          console.error('Login error:', error);
        });
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
      localStorage.removeItem('token');
      this.setState({
        isLoggedIn: false,
        username: '',
        password: '',
        token: '',
        redirectToHome: false
      });
    }

    componentDidMount() {
      const token = localStorage.getItem('token');
      if (token && this.verifyToken(token)) {
        this.setState({
          isLoggedIn: true,
          token: token
        });
      } else {
        // Clear invalid token
        localStorage.removeItem('token');
      }
    }

render(){
  const { isLoggedIn, redirectToHome, authError } = this.state;

  return(
    <div className="App" style={{ backgroundImage: `url(${background})`, height:"100vh",
    backgroundPosition:"center", backgroundRepeat:"noRepeat", backgroundSize: "cover" }}>
      <Router>
        <div className="nav-links">
          <div style={{ marginRight: 'auto' }}>
            <Link to={isLoggedIn ? "/home" : "/login"} style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
              🛒 Cartit
            </Link>
          </div>
          {!isLoggedIn && (
            <>
              <Link className="login-link" to="/login">Sign In</Link>
              <Link className="register-link" to="/register">Sign Up</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Button className="welcome-msg">
                👋 Welcome, {this.state.username}
              </Button>
              <Button 
                className="log-out" 
                variant="contained"
                onClick={this.handleLogout}
              >
                Sign Out
              </Button>
            </>
          )}
        </div>

        <main className="main-content">
          {redirectToHome && isLoggedIn && <Redirect to="/home" />}

          <Switch>
            <Route exact path="/" render={() => (
              isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />
            )} />
            
            <ProtectedRoute exact path="/home" component={Container} />
            
            <Route path="/login" render={(props) => (
              isLoggedIn ? 
              <Redirect to="/home" /> :
              <Signin {...props} 
                submitLogin={this.submitLogin}
                handleUsernameChange={this.handleUsernameChange}
                handlePasswordChange={this.handlePasswordChange}
                username={this.state.username}
                password={this.state.password}
                error={authError}
              />
            )} />

            <Route path="/register" render={(props) => (
              isLoggedIn ?
              <Redirect to="/home" /> :
              <Signup {...props}
                submitRegister={this.submitRegister}
                handleUsernameChange={this.handleUsernameChange}
                handlePasswordChange={this.handlePasswordChange}
                username={this.state.username}
                password={this.state.password}
                error={authError}
              />
            )}/>
          </Switch>
        </main>
      </Router>
    </div>
  )
}
}

export default App;
