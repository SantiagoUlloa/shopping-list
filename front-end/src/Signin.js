import React from "react";
import './Signin.css';

const Signin = (props) => {
  return (
    <div className="auth-card">
      {props.error && (
        <div className="auth-error">
          {props.error}
        </div>
      )}
      <form onSubmit={props.submitLogin}>
        <h2 className="text-center">Welcome Back!</h2>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={props.username}
            onChange={props.handleUsernameChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={props.password}
            onChange={props.handlePasswordChange}
            required
          />
        </div>
        
        <div className="text-center">
          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
