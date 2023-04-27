import { useMemo } from 'react';
import { ThemeProvider, CssBaseline  } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './pages/Login';
import Home from "./pages/Home";
import UserId from './pages/profile/UserId';
import { themeSettings } from './theme';

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const auth = Boolean(useSelector((state) => state.token))

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={auth ? <Home /> : <Navigate to="/login" /> } />
          <Route path='/profiles/:userId' element={ auth ? <UserId /> : <Navigate to='/login' /> } />
          <Route path='/login' element={<Login />} />
      </Routes>
      </ThemeProvider>
      
    </BrowserRouter>
  )
}

export default App
