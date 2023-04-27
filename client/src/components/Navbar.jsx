import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box,
  Typography,
  Select,
  MenuItem,
  InputBase,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {  
  Search,
  LightMode,
  Message,
  Notifications,
  Help,
  Close,
  DarkMode,
  Menu, 
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';

import { setMode, setLogout } from '../state/features/authSlice';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNotMobileScreens = useMediaQuery("(min-width: 1280px)");

  const dispatch = useDispatch();
  const { user, mode } = useSelector((state) => state);

  const { palette } = useTheme();
  const altColor = palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName} `;
  return (
    <Box
      position="fixed"
      zIndex='20'
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="1rem 6%"
      backgroundColor={altColor}
    >
      <Link to="/">
        <Typography
          fontWeight="bold"
          fontSize="2rem"
          color="primary"
        >
          Social
        </Typography>
      </Link>
            {/* Desktop NAV */}
      { isNotMobileScreens ? (
        <>
          <Box
            display='flex'
            justifyContent="space-between"
            alignItems="center"
            p='0.5rem 1rem'
            backgroundColor={palette.neutral.light}
            borderRadius="1rem"
          >
            <InputBase
              placeholder="search..."
            />
            <IconButton>
              <Search />
            </IconButton>
          </Box>
          
          <Box
            display="flex"
            alignItems="center"
            gap='2rem'
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {mode === "light" ? (
                <LightMode sx={{  fontSize: "30px" }} />
              ) : (
                <DarkMode  sx={{  fontSize: "30px" }}/>
              )}
            </IconButton>
            <Message sx={{  fontSize: "30px" }}/>
            <Notifications sx={{  fontSize: "30px" }} />
            <Help sx={{  fontSize: "30px" }}/>
            
            <Select 
              value={fullName}
              sx={{
                p: "0 0.5rem",
                width: "150px",
                backgroundColor: palette.neutral.light,
                borderRadius: "0.5rem" 
              }}  
            >
              <MenuItem
                value={fullName}
              >
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => dispatch(setLogout())}
              >
                Log out
              </MenuItem>
            </Select>
          </Box>
        </>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}
      
      {/* MOBILE NAV*/}
      {!isNotMobileScreens && isMobileMenuToggled && (
        <Box
          p="1rem"
          position="fixed"
          top="0"
          bottom="0"
          right="0"
          minHeight="100%"
          minWidth="300px"
          maxWidth="500px"
          backgroundColor={palette.background.default}
          zIndex='10'
        >
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems='center'
          >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            <IconButton onClick={() => dispatch(setMode(), setIsMobileMenuToggled(!isMobileMenuToggled))}>
              {mode === "light" ? (
                <LightMode sx={{  fontSize: "30px" }} />
              ) : (
                <DarkMode  sx={{  fontSize: "30px" }}/>
              )}
            </IconButton>
            <Message sx={{  fontSize: "30px" }}/>
            <Notifications sx={{  fontSize: "30px" }} />
            <Help sx={{  fontSize: "30px" }}/>

            <Select
              value={fullName}
              sx={{
                p: "0 0.5rem",
                width: '150px',
                backgroundColor: palette.neutral.light,
                borderRadius: '0.5rem',
              }}
            >
              <MenuItem
                value={fullName}
              >
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => dispatch(setLogout())}
              >
                Log out
              </MenuItem>
            </Select>
          </Box>
        </Box>
      )}  
    </Box>
  );
};

export default Navbar;