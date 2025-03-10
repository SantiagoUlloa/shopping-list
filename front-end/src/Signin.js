import React from "react";
import { MDBContainer, MDBCard, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCardBody } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'
import './Signin.css'

const Signin = (props) => {
  return (
    <MDBContainer className="auth-container">
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={props.submitLogin}>
                <h4 className="text-center">Welcome Back!</h4>
                <div className="grey-text">
                  <MDBInput
                    label="Username"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={props.username}
                    onChange={props.handleUsernameChange}
                    className="mb-4"
                  />
                  <MDBInput
                    label="Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    value={props.password}
                    onChange={props.handlePasswordChange}
                    className="mb-4"
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="cyan" type="submit" className="w-100">
                    Sign In
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signin;
