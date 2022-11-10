import React from 'react';
import { Box, Typography } from '@mui/material';

function RedBar({ text }) {
  return (
    <Box
      sx={{
        height: 16,
      }}
    >
      <Typography variant='caption' sx={{ color: 'red' }}>
        {text}
      </Typography>
    </Box>
  );
}

export default RedBar;
