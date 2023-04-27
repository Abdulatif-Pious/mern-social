import { useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import { setFriends } from '../../state/features/authSlice';
import Friend from '../Friend';
import Wrapper from '../Wrapper';

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const { token  } = useSelector((state) => state);
  const { friends } = useSelector((state) => state.user);
  const { palette } = useTheme();

  const getAllFriends = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${userId}/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.data;
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getAllFriends();
  }, [userId]);

  return (
    <Wrapper>
      <Typography mb="2rem"  fontWeight="bold" variant="h6" color={palette.neutral.main}>Friend List</Typography>
      {friends.map(({ _id, picturePath, location, firstName, lastName }, i) => (
        <Friend
          key={`${_id}-${userId}-${i}`}
          friendId={_id}
          userPicturePath={picturePath}
          location={location}
          name={`${firstName} ${lastName}`}
      />
      ))}
      
    </Wrapper>
  );
} ;

export default FriendList;