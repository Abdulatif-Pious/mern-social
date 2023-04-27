import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon  from '@mui/icons-material/EditOutlined';
import Dropzone from 'react-dropzone';
import {  useDispatch } from 'react-redux';

import { setLogin } from '../state/features/authSlice';
import Wrapper from '../components/Wrapper';

const Login = () => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picture: null,
    email: "",  
    password: "",
  });
  const [error, setError] = useState({
    notAllFieldCompletedError: false,
    duplicateEmailError: false,
    notEmail: false,
    passwordError: false,
    wrongPasswordError: false,
  });
  const [loginPageType, setLoginPageType] = useState(false);
  
  const { palette } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const isNonMobileScreens = useMediaQuery("(min-width: 1280px)");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({...user, [name]: value});
  }   

  const handle = () => {
    if (loginPageType) {
      handleRegister()
    } else {
      handleLogin()
    }
  }

            // RESET FORM
  const resetForm = () => {
    setUser({
      firstName: "",
      lastName : "",
      location : "",
      occupation : "",
      picture : "",
      email : "",
      password : ""
    })
  }
            // REGISTER
  const handleRegister = async () => {
    if (user.firstName && user.lastName && user.location && user.occupation && user.picture && user.email && user.password) {
      // HANDLING PASSWORD
      if (user.password.length <= 5) {
        setError({ passwordError: true })
        setTimeout(() => {
          setError({ passwordError: false });
        }, 5000)
        return 
      }
      
      // this alows us to send form with image
      const formData = new FormData();
      for (let value in user) {
        formData.append(value, user[value]);
      };
      formData.append("picturePath", user.picture.name);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, formData);
      
    
      // HANDLING EMAIL DUPLICATE
      if (response.data.message === "email duplicate") {
        setError({ duplicateEmailError: true });
        setTimeout(() => {
          setError({ duplicateEmailError: false })
        }, 5000);
      }
      // EVERYTING IS FINE
      else {
        dispatch(
          setLogin({
            user: response.data.user,
          })
        )
        navigate("/");
      }
    }  else {
      setError({ notAllFieldCompletedError: true });
      setTimeout(() => {
        setError({ notAllFieldCompletedError: false })
      }, 5000)
    }
  }

                // LOGIN 
  const handleLogin = async () => {
    if (user.email && user.password) {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, user)
  

      // HANDLE NOT EMAIL
      if (response.data.message === "email doesn't exist") {
        setError({ notEmail: true })
        setTimeout(() => {
          setError({ notEmail: false });
        }, 5000)
      } 
      // HANDLE WRONG PASSWORD
      else if (response.data.message === "password error") {
        setError({ wrongPasswordError: true });
        setTimeout(() => {
          setError({ wrongPasswordError: false});
        }, 5000)
      } else {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        )
        navigate("/");
      }
    } else {
      setError({ notAllFieldCompletedError: true });
      setTimeout(() => {
        setError({ notAllFieldCompletedError: false });
      }, 5000)
    }
  } 
  
  return (
    <>
      <Wrapper textAlign="center" noMargin noBorder>
        <Typography fontWeight="bolder" fontSize='32px' color={palette.primary.main}>
          Social
        </Typography>
      </Wrapper>
        <Box
          width={isNonMobileScreens ? '50%' : "90%"}
          m='0 auto'
      >
        <Wrapper textAlign='center'>
          <Typography fontWeight='bold'>
            Welcome to Social, 
            the Social Media for Sociopaths!
          </Typography>

              {/* FORM */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gap="30px"
            mt={2}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : 'span 4' }
            }}
          >
          { loginPageType  && (
            <>
              <TextField 
                label="First Name"
                value={user.firstName}
                onChange={handleChange}
                name="firstName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField 
                label="Last Name"
                value={user.lastName}
                onChange={handleChange}
                name="lastName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField 
                label="Location"
                value={user.location}
                onChange={handleChange}
                name="location"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField 
                label="Occupation"
                value={user.occupation}
                onChange={handleChange}
                name="occupation"
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                gridColumn='span 4'
                border={`2px solid ${palette.neutral.light}`}
                borderRadius="5px"
                p='1rem'
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => setUser({ picture: acceptedFiles[0] })}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: 'pointer', border: `2px dashed ${palette.primary.light}` } }}
                    >
                      <input {...getInputProps()} />
                      {!user.picture ? (
                        <p>Add Picture in jpg or jpeg, or png format Here</p>
                      ) : (
                        <Box
                          display='flex'
                          alignItems="center"
                          justifyContent='space-between'
                        >
                          <Typography>{user.picture.name}</Typography>
                          <EditOutlinedIcon />
                        </Box>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </>
          )}
          <TextField 
            label="email"
            type='email'
            required
            value={user.email}
            onChange={handleChange}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField 
            label="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
          {/* Buttons */}
          <Box
            mt='2rem'
          >
            <Button
              onClick={handle}
              fullWidth
              type='submit'
              sx={{
                p: '1rem',
                backgroundColor:  palette.primary.main,
                color: 'white',
                "&:hover": {
                  backgroundColor: palette.primary.light,
                }
              }}          
            >
              { loginPageType ? "Register" : "Login"}
            </Button>
            {/*  HANDLE NOT ALL FIELD COMPLETE */}
            {error.notAllFieldCompletedError && (
              <Typography
                my='1rem'
                fontWeight='bold' 
                fontSize="18px"
                color='red'  
              >
                Please fill in every field.
              </Typography>
            )}

            {/*  HANDLE EMAIL DUPLICATE */}
            {error.duplicateEmailError && (
              <Typography
                my='1rem'
                fontWeight='bold' 
                fontSize="18px"
                color='red'  
              >
                The email has already in use. Please choose another one.
              </Typography>
            )}

            {/*  HANDLE PASSWORD */}
            {error.passwordError && (
              <Typography
                my='1rem'
                fontWeight='bold' 
                fontSize="18px"
                color='red'  
              >
                Please password length needs more then 5.
              </Typography>
            )}

            {/*  HANDLE NOT EXIST EMAIL */}
            {error.notEmail && (
              <Typography
                my='1rem'
                fontWeight='bold' 
                fontSize="18px"
                color='red'  
              >
                The email isn't exist.
              </Typography>
            )}

            {/*  HANDLE WRONG PASSWORD */}
            {error.wrongPasswordError && (
              <Typography
                my='1rem'
                fontWeight='bold' 
                fontSize="18px"
                color='red'  
              >
                The password is wrong. Please try again.
              </Typography>
            )}


            <Typography
              onClick={() => { 
                setLoginPageType(!loginPageType); 
                resetForm()
              }}
              color={ palette.primary.main }
              fontWeight="semibold"
              fontSize= '18px'
              mt='1rem'
              sx={{"&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              }}}
            >
              { loginPageType ? "Don't have  an account ? Sign up here" : "Already have an account ? Login here"} 
            </Typography>
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};

export default Login;