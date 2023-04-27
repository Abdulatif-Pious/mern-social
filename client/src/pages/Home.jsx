import { Box, useMediaQuery } from "@mui/material";

import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import { Ad, CreatePost, FriendList, UserInfo } from '../components/widgets';
import Posts from '../components/Posts';


const Home = () => {
  const { _id, picturePath } =  useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width: 1280px)");

  return (
    <Box>
      <Navbar />
      <Box 
        py="5rem"
        mx="6%"
        display={isNonMobileScreens ? "flex" : 'block'}  
        gap='5rem'
      >
        <Box
          display='flex'
          flexBasis={isNonMobileScreens ?  "26%" : undefined}
        >
          <UserInfo userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          flexBasis={isNonMobileScreens ? "46%" : undefined }
        >
          <CreatePost picturePath={picturePath} />
          <Posts userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box
            display="flex"
            flexDirection='column'
            flexBasis="26%"
          >
            <Ad />
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
};

export default Home;