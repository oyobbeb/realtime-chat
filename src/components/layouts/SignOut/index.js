import { getAuth } from "firebase/auth";
import React from "react";
import styled from "styled-components";

function SignOut() {
  const auth = getAuth();
  return (
    <Button onClick={() => auth.signOut()}>
      Sign Out
    </Button>
  )
}

const Button = styled.button`
  width: 10vw;
  height: 100%;
  border-radius: 5px;
  background-color: white;
  border: hidden;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);

  :hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`

export default SignOut;
