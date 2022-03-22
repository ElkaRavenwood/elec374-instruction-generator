import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import strings from '../Resources/strings';

const Instructions = () => {
    return (
        <Box>
            <Typography variant="h3" gutterBottom>{strings.site_title}</Typography>
            <Typography gutterBottom>{strings.instructions} </Typography>
        </Box>
    )
}

export default Instructions;