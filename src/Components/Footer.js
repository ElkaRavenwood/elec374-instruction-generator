import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react'
import strings from '../Resources/strings';

// Copyright fn from mui
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={strings.git_link}>
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
      <Typography color="text.secondary" variant="body2">{strings.footer.disclaimer}</Typography>
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