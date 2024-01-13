import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import secureApi from '../../api/secureApi';
import { toast, ToastContainer } from 'react-toastify';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://techzaint.com/">
                TechZaint
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        const loginInfo = {
            email: data.get('email'),
            password: data.get('password'),
        }
        // Checking through the server;
        secureApi.post('/login', loginInfo)
            .then(res => {
                if (res.email_verification === 'false') {
                    toast.error('Please wait, it will redirect you to the verification page')
                    setTimeout(() => {
                        sessionStorage.setItem('email', res.user.email)
                        // send the verification code;
                        secureApi.post(`/send-code?email=${res.user.email}`)
                            .then(res => {
                                if (res.success == true) {
                                    navigate('/verification')
                                }
                                else {
                                    navigate('/login')
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }, 1500)
                    return;
                }
                if (res.user) {
                    localStorage.setItem('access-token', res.access_token)
                    localStorage.setItem('email', res.user.email)
                    toast('Login Successfull')
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 1500)
                }
            })
            .catch(err => {
                if (err) {
                    toast.error('Invalid username/password')
                    return;
                }
            })
            .finally(() => {
                setLoading(false)
            })

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {loading ? <span className='text-green-500'>Signing in.....</span> : <span>Sign in</span>}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            <ToastContainer />
        </ThemeProvider>
    );
}