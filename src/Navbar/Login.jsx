import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../helper/AxiosInstance';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const defaultTheme = createTheme({
    typography: {
        fontFamily: 'sans-serif', // Default Material-UI font
        h1: {
            fontFamily: 'fantasy', // Custom font for heading 1
            fontWeight: 700, // Custom font weight for heading 1
        },
        body1: {
            fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            fontSize: '1rem', // Custom font size for body text
        },
        body2: {
            fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            fontSize: '1rem', // Custom font size for body text
        },
    },
});

const Login = () => {
    let navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        emph: '',
        password: '',
        rememberMe: false,
    });
    const [isOpen, setIsOpen] = React.useState(true);
    const [errors, setErrors] = React.useState({});
    const { emph, password } = formData;

    const handleCloseSignUp = () => {
        setIsOpen(false);
        navigate("/")
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation 
        const newErrors = {};
        const phoneRegex = /^\d{10}$/; // Match exactly 10 digits
        if (!emph.trim()) {
            newErrors.emph = 'Email or Phone number is required';
        } else if (!/\S+@\S+\.\S+/.test(emph) && !phoneRegex.test(emph)) {
            newErrors.emph = 'Please enter a valid email or phone number';
        }
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        } else if (!isPasswordValid(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character';
        }

        // Set errors, if any
        setErrors(newErrors);

        // If there are no errors, submit the form
                let params = {
                emph: formData.emph,
                password: formData.password
            };
            // console.log(formData);
            const endpoint='/quantum-socialshare/user/login';
            try{
                const response = await axiosInstance.post(endpoint,formData,{
                    headers: {
                        'Accept': 'application/json',
                    }, 
                    params:params
                })
                navigate("/dashboard")
                console.log('Response:', response.data);
                // console.log(response);
            }
            catch(error){
                console.error('error submiting', error)
            
        }
    }
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    const [isMuted, setIsMuted] = React.useState(true);
    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {isOpen && ( 
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} sx={{
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                }}>
                    <video autoPlay loop muted={isMuted} style={{ width: '100%', height: '100%', objectFit: 'fill' }}>
                        <source src="../Assets/SocialMedia.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <IconButton onClick={toggleMute} style={{ position: 'absolute',  left: '10px', color: '#BA343B' }}>
                        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <CloseOutlinedIcon style={{ position: 'absolute', top: 0, right: 0,  
                            fontSize: 30, color: '#ba343b', cursor: 'pointer', }}
                            onClick={handleCloseSignUp}/>
                        <Avatar sx={{ m: 1, bgcolor: '#ba343b' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Login</Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="emph" label="e-mail/ Phone Number" name="emph" value={emph} onChange={handleChange} error={!!errors.emph} helperText={errors.emph} autoFocus />
                            <TextField margin="normal" required fullWidth name="password" label="Password" type={passwordVisible ? 'text' : 'password'} id="password" value={password} onChange={handleChange} error={!!errors.password} helperText={errors.password} autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {passwordVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />} </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                            <FormControlLabel
                                control={<Checkbox name="rememberMe" color="primary" />}
                                label="Remember me" />
                            <Button type="submit" fullWidth variant="contained"
                                sx={{
                                    mt: 3, mb: 2, height: '50px', fontSize: '18px', bgcolor: '#ba343b',
                                    '&:hover': { bgcolor: '#9e2b31' },
                                    fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                                }}> Log In</Button>

                            <Grid container>
                                <Grid item xs>
                                    <div style={{ marginTop: '10px' }}>
                                        <Link href="#" variant="body2" style={{ textDecoration: 'none' }}> Forgot Password?</Link>
                                    </div>
                                </Grid>

                                <Grid item>
                                    <div style={{ marginTop: '10px' }}>
                                        <Link href="/signUp" variant="body2" style={{ color: 'black', textDecoration: 'none' }}>
                                            Don't Have An Account?{' '}
                                            <span style={{ color: '#1976db' }}>Sign Up</span>
                                        </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
             )}
        </ThemeProvider>
    );
}

export default Login;
