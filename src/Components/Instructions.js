import { Box, Typography } from '@mui/material';
import React from 'react';

const Instructions = () => {
    return (
        <Box>
            {/* Write your instruction with spaces and commas as is proper assembly code. For example, for a load instruction, write 
            <br/>
            ld Ra,C
            <br/>
            Don't be dumb or this will crash hehe */}
            <Typography variant="h3" gutterBottom>{process.env.REACT_APP_TITLE}</Typography>
            <Typography gutterBottom>{process.env.REACT_APP_INSTRUCTIONS} </Typography>
        </Box>
    )
}

export default Instructions;