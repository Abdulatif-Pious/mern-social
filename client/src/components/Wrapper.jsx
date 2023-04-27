import { Box, useTheme } from '@mui/material';

const Wrapper = ({ children, width, maxHeight, textAlign, noMargin, noBorder }) => {
  const { palette } = useTheme();
  const altColor = palette.background.alt;
  
  return (
    <Box
      backgroundColor={altColor}
      padding="1.5rem"
      my={`${noMargin ? "0" : "2rem"}`}
      borderRadius={`${noBorder ? 0 : "1rem"}`}
      width={width}
      maxHeight={maxHeight}
      textAlign={textAlign}
    >
      {children}
    </Box>
  );
};

export default Wrapper;