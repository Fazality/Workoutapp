import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import "../../assets/expertaLogo.jpg"
import { Link } from 'react-router-dom';


function NavigationBar() {
  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img alt="xperta" height="50px" src="../src/assets/expertaLogo.jpg" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Xperta
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/"
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/profile"
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Profile
            </Button>
            <Button
              component={Link}
              to="/browse"
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Excercise
            </Button>
            <Button
              component={Link}
              to="/workout"
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Workout
            </Button>
            <Button
              component={Link}
              to="/faq"
              sx={{ my: 2, color: "black", display: "block" }}
            >
              FAQ
            </Button>
          </Box>
          <Typography variant="h6" color="inherit" noWrap>
            Xperta Workout Planner
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;