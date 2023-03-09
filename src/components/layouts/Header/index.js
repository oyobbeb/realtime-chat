import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../../features/api/firebaseApi";
import SignOut from "../SignOut";

export default function Header({ text }) {
  const navigate = useNavigate();

  return(
    <Container>
      <Navigation>
        <NavigationHome>
          <NavigationLink onClick={() => navigate('/')}>
            <TextBox>대화상대 : {text}</TextBox>
          </NavigationLink>
        </NavigationHome>
        <NavigationMenu>
          <ProfilePicture src={auth.currentUser.photoURL} />
          <TextBox>{auth.currentUser.displayName}</TextBox>
          <SignOut />
        </NavigationMenu>
      </Navigation>
    </Container>
  )
}

const ProfilePicture = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 20px 0 0;
`

const TextBox = styled.div`
  margin: 0 40px 0 0;
`

const Container = styled.header`
  width: 100%;
  top: 0;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
`

const Navigation = styled.nav`
  display: flex;
  background-color: white;
  height: 5vh;
  justify-content: space-between;
  padding: 10px;
`

const NavigationLink = styled.nav`
  display: flex;
  height: 100%;
  font-size: 20px;
  align-items: center;
  text-decoration: none;
  padding: 0 2vw 0 0;
  cursor: pointer;

  :hover,
  :active {
    color: #1877f2;
  }
  :first-child {
    margin: 0 0 0 2vw;
  }
`

const NavigationHome = styled.div`
  flex: 2;
`

const NavigationMenu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`
