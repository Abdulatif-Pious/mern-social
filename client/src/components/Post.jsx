import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { FavoriteBorderOutlined, FavoriteOutlined, ModeCommentOutlined, ShareOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Friend from './Friend';
import Wrapper from './Wrapper';
import { setPost } from '../state/features/authSlice';

const Post = ({ 
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments }) => {
  
  const { token } = useSelector((state) => state);  
  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const isLiked = Boolean(likes[loggedInUserId]);
  const likesLength = Object.keys(likes).length;
  
  const handleLike = async () => {
    const response = await axios({
      method: "patch",
      url: `${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`,
      data: { userId: loggedInUserId },
      headers: { Authorization: `Bearer ${token}` }
    });
    const post = await response.data;
    dispatch(setPost({ post }));

  };

  return (
    <Wrapper>
      <Friend 
        friendId={postUserId}
        userPicturePath={userPicturePath}
        name={name}
        location={location}
      />
      <Typography  my="2rem" color={palette.neutral.main}>{description}</Typography>
      { picturePath && (
        <img 
          src={`${import.meta.env.VITE_BASE_URL}/assets/${picturePath}`}
          alt="post_img"
          width="100%"
          height="auto"
          style={{ borderRadius: "1rem"}}
        />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems='center'
      >
        <Box
          display="flex"
          alignItems='center'
          gap="1rem"
        >
          <Box
            display='flex'
            alignItems='center'
          >
            <IconButton
              onClick={handleLike}
              sx={{"&:hover": { backgroundColor: palette.primary.light } }}
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: palette.primary.main  }} />
              ) : (
                <FavoriteBorderOutlined  />
              )}
            </IconButton>
            <Typography color={palette.neutral.main}>{likesLength}</Typography>
          </Box>
          <Box
            display='flex'
            alignItems='center'
          >
            <IconButton>
              <ModeCommentOutlined sx={{ color: palette.neutral.main}}/>
            </IconButton>
            <Typography color={palette.neutral.main}>{comments.length}</Typography>
          </Box>
        </Box>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Box>
    </Wrapper>
  );
};
export default Post;