import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { auth } from '../../features/api/firebaseApi';
import { useAuthState } from 'react-firebase-hooks/auth';

import Home from '../Home';
import Signin from '../layouts/SignIn';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user] = useAuthState(auth);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Routes>
        <Route path='/home' element={user ? <Home /> : <Signin />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </React.Fragment>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
  }
`

export default App;
