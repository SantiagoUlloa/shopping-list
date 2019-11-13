import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import './Signup.css';

const Signup = (props) => {
  return (
    <MDBContainer className="signup-container justify-content-center">
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit = {props.submitRegister}>
                <p className="h4 text-center py-4">Sign up</p>
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

                  />
                  <MDBInput
                    label="Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    value={props.password}
                    onChange={props.handlePasswordChange}
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" value="submit" type="submit">
                    Register
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
