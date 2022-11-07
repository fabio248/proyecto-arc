import React from 'react';
import { Box, Typography } from '@mui/material';

function RedBar({ text }) {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: (theme) => 'rgba(255, 0, 0, 0.1)',
      }}
    >
      <Typography variant='subtitle2' sx={{ color: 'red', fontWeight: 'bold' }}>
        {text}
      </Typography>
    </Box>
  );
}

export default RedBar;
