import { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import {  useSelector  } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import UserInfo from '../../components/widgets/UserInfo';
import  FriendList from '../../components/widgets/FriendList';
import  CreatePost from '../../components/widgets/CreatePost';
import  Posts from '../../components/Posts';

const UserId = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width: 1280px)");
  const { token } = useSelector((state) => state);

  // const { picturePath, friends } = useSelector((state) => state.auth.user);

  const getUser = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}`}
    });

    const data = await response.data;
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, [userId])

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="center"
        gap="5rem"
        p="5rem 6%"
      >
        <Box
          flexBasis={isNonMobileScreens && "25%"}
        >
          <UserInfo userId={userId} picturePath={user?.picturePath} />
          <FriendList userId={userId} />
        </Box>
  
        <Box
          flexBasis={isNonMobileScreens && "50%"}
        >
          <CreatePost picturePath={user?.picturePath}  />
          <Posts userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default UserId;