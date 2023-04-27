import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Divider, useTheme } from '@mui/material';
import axios from 'axios';
import {
  ManageAccounts, Place, Work, Edit, Twitter, LinkedIn, PaletteSharp
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from '../Wrapper';
import UserImage from '../UserImage';


const UserInfo = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);

  const { token } = useSelector((state) => state);

  const { palette } = useTheme();

  const getUser = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUser(response.data);
  }

  useEffect(() => {
    getUser();
  }, [userId]);

  if (!user) {
    return null
  }
  const {
    viewedProfile,
    firstName,
    friends,
    impressions,
    lastName,
    location,
    occupation,

  } = user;

  return (
    <Wrapper width="100%" maxHeight="450px">
      <Box
        display='flex'
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display='flex'
          gap="1rem"
          alignItems='center'
        >
          <UserImage
            image={picturePath}
            size="50px"
          />
          <Link to={`/profiles/${userId}`} style={{ color: "black" }} >
            <Typography color={palette.neutral.dark}>{firstName} {lastName}</Typography>
            <Typography color={palette.neutral.medium}>{friends.length} friends</Typography>
          </Link>
        </Box>
        <Link to={`/profiles/${userId}`} >
          <IconButton>
            <ManageAccounts sx={{ color: palette.neutral.main }} />
          </IconButton>
        </Link>
        
      </Box>
      
      <Divider sx={{my: '1rem'}} />
      
      <Box
        display='flex'
        alignItems='center'
        gap="0.5rem"
        mb="0.5rem"
      >
        <Place sx={{ color: palette.neutral.main }} />
        <Typography color={palette.neutral.medium}>{location}</Typography>
      </Box>
      <Box
        display='flex'
        alignItems='center'
        gap="0.5rem"
      >
        <Work sx={{ color: palette.neutral.main }} />
        <Typography color={palette.neutral.medium}>{occupation}</Typography>
      </Box>

      <Divider sx={{my: '1rem'}} />

      <Box
        display='flex'
        justifyContent="space-between"
        alignItems='center'
        mb="0.5rem"
      > 
        <Typography color={palette.neutral.medium}>Who's viewed your profile</Typography>
        <Typography color={palette.neutral.main}>{viewedProfile}</Typography>
      </Box>
      <Box
        display='flex'
        justifyContent="space-between"
        alignItems='center'
      > 
        <Typography color={palette.neutral.medium}>Impressions of your post</Typography>
        <Typography color={palette.neutral.main}>{impressions}</Typography>
      </Box>

      <Divider sx={{ my: "1rem" }}/>

      <Typography fontWeight="bold" variant="body1" mb='1rem' color={palette.neutral.main}>Social Profiles</Typography>
      <Box
        display='flex'
        justifyContent="space-between"
        alignItems='center'
      >
        <Box
          display='flex'
          alignItems='center'
          gap="1rem"
          mb="0.5rem"
        >
          <Twitter sx={{fontSize: "30px", color:palette.neutral.main}} />
          <Box>
            <Typography color={palette.neutral.main}>Twitter</Typography>
            <Typography color={palette.neutral.medium}>Socail Network</Typography>
          </Box>
        </Box>
        <Edit sx={{ color: palette.neutral.main }} />
      </Box>
      <Box
        display='flex'
        justifyContent="space-between"
        alignItems='center'
      >
        <Box
          display='flex'
          alignItems='center'
          gap="1rem"
        >
          <LinkedIn sx={{fontSize: "30px", color: palette.neutral.main}} />
          <Box>
            <Typography color={palette.neutral.main}>LinkedIn</Typography>
            <Typography color={palette.neutral.medium}>Network Platform</Typography>
          </Box>
        </Box>
        <Edit sx={{ color:palette.neutral.main }} />
      </Box>
    </Wrapper>
    
  );
};

export default UserInfo;