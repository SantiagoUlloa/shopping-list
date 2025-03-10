import React from "react";
import { MDBContainer, MDBCard, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCardBody } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import './Signup.css';

const Signup = (props) => {
  return (
    <MDBContainer className="auth-container">
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={props.submitRegister}>
                <h4 className="text-center">Create Account</h4>
                <div className="grey-text">
                  <MDBInput
                    label="Choose a Username"
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
                    label="Choose a Password"
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
                    Create Account
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

export default Signup;
