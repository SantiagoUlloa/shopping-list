import React from "react";
import './Signup.css';

const Signup = (props) => {
  return (
    <div className="auth-card">
      {props.error && (
        <div className="auth-error">
          {props.error}
        </div>
      )}
      <form onSubmit={props.submitRegister}>
        <h2 className="text-center">Create Account</h2>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Choose a username"
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
            placeholder="Choose a password"
            value={props.password}
            onChange={props.handlePasswordChange}
            required
          />
        </div>
        
        <div className="text-center">
          <button type="submit" className="btn-submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
