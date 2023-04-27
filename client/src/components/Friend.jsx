import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserImage from './UserImage'; 

import { setFriends } from '../state/features/authSlice';

const Friend = ({ friendId, userPicturePath, name, location }) => {
  const { _id } = useSelector((state) => state.user);
  const { friends }  = useSelector((state) => state.user);
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { palette } = useTheme();


  const handleAddOrRemoveFriend = async () => {
    const response = await axios({
      method: "patch",
      url: `${import.meta.env.VITE_BASE_URL}/users/${_id}/${friendId}`,
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.data;
    dispatch(setFriends({ friends : data }))

  }
  const isFriend = friends?.find((friend) => friend._id === friendId);
  if (!friendId) return null

  return (
    <Box
      display="flex"  
      justifyContent="space-between"
      alignItems='center'
      my="2rem"
    >
      <Box
        display='flex'
        alignItems='center'
        gap="1rem"
      >
        <UserImage 
              image={`${userPicturePath}`}
              size="55px"
        />
        <Link to={`/profiles/${friendId}`} style={{ color: "black" }}>
          <Typography color={palette.neutral.dark}>{name}</Typography>
          <Typography color={palette.neutral.medium}>{location}</Typography>
        </Link>
      </Box>
      {_id !== friendId && (
        <IconButton
          onClick={handleAddOrRemoveFriend}
          sx={{
            backgroundColor: palette.primary.light,
            "&:hover": {
              backgroundColor: palette.primary.main
            }
          }}
        >
          { isFriend ? (
            <PersonRemoveOutlined sx={{ color: palette.neutral.dark }} />
          ) : (
            <PersonAddOutlined /> 
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default Friend;