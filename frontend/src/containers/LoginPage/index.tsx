import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Link from "../../components/Link";

import * as React from 'react';
import useAuth from '../../hooks/useAuth';

import { useLocation, useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() {

  const { login } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const  from  = location.state?.from?.pathname || "/";
  
  const userRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef<HTMLParagraphElement>(null);
  

  const [ID, setID] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => { if (userRef.current) { userRef.current.focus(); } },[]);
  React.useEffect(() => { setErrMsg(''); }, [ID, password]);
  const handleClose = () => { setOpen(false); };
  const handleOpen = () => { setOpen(true); };


  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      fetch('http://localhost:4001/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ID, password }),
      })
      .then(response => response.json())
      .then(data => { 
          console.log(data);
          if (data.status === 200) {
            console.log('Login successful!');
            const Role_ID = data.role;
            const user = {ID, password, Role_ID};
            login(user);
            setID('');
            setPassword('');
            navigate(from, { replace: true});

          }
          else throw new Error('Wrong username or password!');
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <p ref={errRef} className={errMsg ? "errmsg": 
            "offscreen"} aria-live='assertive'>{errMsg}</p>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="ID"
              label="Gym ID"
              name="ID"
              inputRef={userRef}
              autoComplete="gym-id"
              autoFocus
              onChange={(e) => setID(e.target.value)}
              value={ID}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button  onClick={handleOpen}>Forgot password?</Button>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}