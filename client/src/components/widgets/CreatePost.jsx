import { useState } from 'react';
import { 
  Box, 
  Typography,
  InputBase,
  Button,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ImageOutlined,
  GifBoxOutlined,
  AttachFile,
  Mic,
  DeleteOutline,
  MoreHoriz,
}  from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import {  useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import Wrapper from '../Wrapper';
import  UserImage  from '../UserImage';
import { setPosts } from '../../state/features/authSlice';


const CreatePost = ({ picturePath }) => {
  const [postDescription, setPostDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);

  const { palette } = useTheme();

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const isNonMobileScreens = useMediaQuery("(min-width: 1280px)");

  const handlePost = async () => {
    // this ALLOWS US TO SEND WITH PICTURE;
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", postDescription);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await axios({
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/posts`,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.data;
    dispatch(setPosts({ posts }))
    setIsImage(false);
    setImage(null);
    setPostDescription("");
  };

  return (
    <Wrapper>
      <Box
        display='flex'
        justifyContent="space-between"
        alignItems='center'
        gap='2rem'
      >
        <UserImage 
          image={picturePath}
          size='50px'
        />
        <InputBase
          onChange={(e) => setPostDescription(e.target.value)}
          value={postDescription}
          sx={{
            p: "1rem 1.5rem",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            width: "100%"
          }}
          placeholder="What's on your mind..."
        />
      </Box>

      <Divider sx={{ my:  '1rem' }}/>

        {isImage && (
          <Box
            sx={{
              border: `1px solid ${palette.neutral.medium}`,
              borderRadius: '0.5rem',
              my: "1rem",
            }}
          >
            <Dropzone
              acceptedFiles=".jpeg,.jpg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps}) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px='0.5rem'
                >
                  <Box
                    {...getRootProps()}
                    sx={{
                      m: '1rem',
                      p: '2rem',
                      width: "100%",
                      border: `2px dashed ${palette.primary.main}`,
                      "&:hover": {
                        cursor: "pointer",
                      }
                    }}
                  >
                    <input {...getInputProps()}/>
                    {image ? (
                      <Typography>{image.name}</Typography>
                    ) : (
                      <Typography textAlign='center' color={palette.neutral.dark}>Add jpeg,  jpg, or png format picture.</Typography>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
        )}
      <Box
        display='flex'
        justifyContent="space-between"
        alignItems='center'
      >
          <IconButton
            sx={{
              display: "flex",
              gap: '0.5rem',
              p: '1rem',
            }}
            onClick={() => setIsImage(!isImage)}
          >
            <ImageOutlined sx={{ color: palette.neutral.medium}} />
            <Typography color={palette.neutral.medium}>Image</Typography>
          </IconButton>
        {isNonMobileScreens ? (
          <>
            <Box
              display='flex'
              gap='0.3rem'
            >
              <GifBoxOutlined sx={{ color: palette.neutral.medium}} />
              <Typography color={palette.neutral.medium}>Clip</Typography>
            </Box>
            <Box
              display='flex'
              gap='0.3rem'
            >
              <AttachFile sx={{ color: palette.neutral.medium}} />
              <Typography color={palette.neutral.medium}>Attachment</Typography>
            </Box>
            <Box
              display='flex'
              gap='0.3rem'
            >
              <Mic sx={{ color: palette.neutral.medium}} />
              <Typography color={palette.neutral.medium}>Audio</Typography>
            </Box>
          </>
        ) : (
          <MoreHoriz sx={{ color: palette.neutral.medium}} />
        )}
        <Button
          disabled={!postDescription}
          sx={{
            fontWeight: "bold",
            backgroundColor: palette.primary.main,
            color: palette.neutral.dark,
            borderRadius: '3rem',
            py: '0.75rem',
            px: '1.5rem',
            "&:hover": {
              backgroundColor: palette.primary.light
            }
          }}
          onClick={handlePost}
        >
          Post  
        </Button>
      </Box>
    </Wrapper>
    
  );
};

export default CreatePost;