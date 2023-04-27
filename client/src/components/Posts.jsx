import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch }from 'react-redux';
import axios from 'axios';

import Post from './Post';
import { setPosts } from '../state/features/authSlice';

export const Posts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const { posts, token } = useSelector((state) => state);
  
  const getAllPosts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {
      headers: {Authorization: `Bearer ${token}`}
    });
    const posts = await response.data;
    dispatch(setPosts({ posts }));
  };

  const getUserPosts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${userId}/posts`, {
      headers: {Authorization: `Bearer ${token}`}
    });
    const posts = await response.data;
    dispatch((setPosts({ posts })))
  }
  
  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getAllPosts();
    }
  }, [userId]);

  return (
    <Box>
      {posts?.map(({
        _id, 
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments }) => (
          <Post
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          /> 
        ))}
    </Box>
  );
};

export default Posts;