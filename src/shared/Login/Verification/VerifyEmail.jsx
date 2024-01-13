import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import secureApi from '../../../api/secureApi';

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

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false)
    const defaultTheme = createTheme();
    const navigate = useNavigate();

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        // Add your verification logic here
        const email = sessionStorage.getItem('email');
        secureApi.patch(`/verify-email?email=${email}&remember_token=${verificationCode}`)
            .then(res => {
                if (res.success == true) {
                    toast.success(res.message)
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500)
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch(err => {
                console.log(err)
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
                    {/* <Typography component="h1" variant="h5">
                        {loading ? <span className='text-green-500'>Signing in.....</span> : <span>Sign in</span>}
                    </Typography> */}
                    <Typography component="h1" variant="h6">
                        <span className='text-green-500 '>Verification code hasbeen sent to,</span> <br />
                        <span className='text-green-500 '>{sessionStorage.getItem('email')}</span> <br />
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {loading ? <span className='text-blue-500'>Verifying.....</span> : <span></span>}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            label="Enter 6-digit code"
                            variant="outlined"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            inputProps={{ maxLength: 6 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/" variant="body2">
                                    Back to Home
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
};

export default VerifyEmail;
