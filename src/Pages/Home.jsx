import React from "react";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Home() {
  return (
    <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 4 }}>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        color="primary"
      >
        Go to Register
      </Button>
      <Button
        component={Link}
        to="/login"
        variant="outlined"
        color="primary"
      >
        Go to Log in
      </Button>
    </Stack>
  );
}

export default Home;
