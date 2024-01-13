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
import { Link } from 'react-router-dom';
import { Input } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import secureApi from "../../api/secureApi";

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

export default function Register() {
    const [imageName, setImageName] = useState('Choose File')

    const handleFileChange = (event) => {
        const fileInput = event.target;
        const selectedFile = fileInput.files[0];

        // Update the label text with the selected file name
        setImageName(selectedFile ? selectedFile.name : 'Choose File');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const image = data.get('avatar');

        if (image.size / 1024 > 100) {
            toast.error('More than 100kb image not allowed')
            return
        }

        // Read the image file and convert it to base64
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = () => {
            const base64Image = reader.result;

            // Now you can use base64Image in your userInfo object or perform any other action
            const userInfo = {
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
                avatar: base64Image,
            };

            // send to server for registration
            secureApi.post('/register', userInfo)
                .then(res => {
                    // console.log(res)
                    if (res.success == true) {
                        toast.success(res.message)
                    }
                    else if (res.success == false) {
                        toast.error(res.message)
                    }
                })
                .catch(err => {
                    toast.error('Something went wrong')
                    console.log(err)
                })
        };

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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    name="name"
                                    autoComplete="your name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid container spacing={2} style={{ marginTop: '5px' }}>
                                <Grid item xs={12}>
                                    <Input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        required
                                        fullWidth
                                        id="avatar"
                                        name="avatar"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="avatar" className='ml-4'>
                                        <Button variant="outlined" component="span" style={{ width: '96%' }}>
                                            {imageName}
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <ToastContainer />
        </ThemeProvider>
    );
}