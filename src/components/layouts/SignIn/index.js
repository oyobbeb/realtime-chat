import React from "react";
import styled from "styled-components";

import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider);
}

export default function Signin() {
  return (
      <Content>
        <Button onClick={googleSignIn}>Sign in with Google</Button>
      </Content>
  )
}

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Button = styled.button`
  display: flex;
  position: absolute;
  width: 200px;
  height: 100px;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: hidden;
  font-size: 22px;
  border-radius: 5px;

  :hover {
    color: #1877f2
  }
`
