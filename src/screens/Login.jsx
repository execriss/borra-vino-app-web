import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import fondo from "../assets/images/fondo.jpg";
import logo from "../assets/images/borraVinoLogo.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="#">
        Borra Vino Social Club
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      {'V 1.9.0 Beta'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  let navigate = useNavigate();
  const [msgerror, setMsgerror] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const auth = getAuth(firebaseApp);
    function handleSubmit(e) {
      e.preventDefault();
      setLoading(true)
      const data = new FormData(e.currentTarget)
      const email = data.get('email');
      const password = data.get('password');

        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          navigate('/home')
          setTimeout(() => {
            setLoading(false)
          }, 3000);
        })
        .catch((err) => {
          if (err.code === 'auth/wrong-password') {
            setMsgerror('¡Email / Contraseña incorrecto!')
          }
          if (err.code === 'INVALID_EMAIL') {
            setMsgerror('¡Email / Contraseña incorrecto!')
          }
          if (err.code === 'auth/user-not-found') {
            setMsgerror('El Usuario no existe en la base de datos.')
          }
          setLoading(false)
      })
    }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${fondo})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[300] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className='mb-3'>
              <img src={logo} alt="" />
            </div>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="off"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#8B0000", color: "white" }}
              >
                {
                  loading ? 
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Cargando...</span>
                    </div> 
                  :
                  <p>INGRESAR</p>
                }
              </Button>
              {
                msgerror !== null ?
                  (
                    <div className='alert alert-danger'>
                      {msgerror}
                    </div>
                  )
                  :
                  (
                    <span></span>
                  )
              }
              <Copyright sx={{ mt: 15 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}