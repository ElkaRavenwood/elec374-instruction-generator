import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react'

// Copyright fn from mui
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={process.env.REACT_APP_GIT_LINK}>
        ElkaRavenwood
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Disclaimer = () => {
  return (
    <Box mb={2}>
      <Typography color="text.secondary" variant="body2">{process.env.REACT_APP_FOOTER_DISCLAIMER}</Typography>
    </Box>
  )
}


const Footer = () => {
  return (
    <Box mb={3} mt={4}>
      <Disclaimer/>
      <Copyright/>
    </Box>
  );
};

export default Footer;