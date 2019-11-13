import React from "react";
import { MDBContainer, MDBCard, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'
import './Signin.css'

const Signin = (props) => {
  return (
    <MDBContainer className="signin-container justify-content-center">
      <MDBRow>
        <MDBCol md="6">
        <MDBCard>
          <form onSubmit = {props.submitLogin}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your username"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={props.username}
                onChange={props.handleUsernameChange}
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                value={props.password}
                onChange={props.handlePasswordChange}
              />
            </div>
            <div className="text-center">
              <MDBBtn color="cyan" type="submit" value="submit">Login</MDBBtn>
            </div>
          </form>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signin;
