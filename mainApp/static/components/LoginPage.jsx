import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner'
import { Button, TextField, Card, Typography, CircularProgress, Link, Grid } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {loadUser, login} from '../redux/userSlice.js';
import "../index.css";

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const authenticated = useSelector(state => state.user.isAuthenticated)
  const status = useSelector(state => state.user.status)
  const error = useSelector(state => state.user.error)
  const mail = useSelector(state => state.user.email)
  const access = useSelector(state => state.user.access)

  const checkLoading = status === 'loading';

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setMessage("Email/Password field cannot be empty.");
    } else {
          setMessage(null)
          dispatch(login({email, password}))
      }
    }

    useEffect(() => {
      if(status == 'authenticated'){
        setMessage(null)
        dispatch(loadUser());
      } 
      else if(status == 'unauthenticated' || status == 'failure') {
        console.error(error);
        setMessage(error || "Login failed. Please try again.");
      } 
      else if(status == 'success') {
        setMessage(null)
      }
    }, [status])

  return ( checkLoading ? <Spinner text="Loading..." /> : <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
    <Grid item xs={11} sm={8} md={4}>
      <Card style={{ padding: '30px', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
        <Typography variant="h4" component="div" style={{ textAlign: 'center', marginBottom: '20px', color: '#101460' }}>
          Login Dashboard
        </Typography>
        {message && (
          <Typography color="error" style={{ textAlign: 'center', marginBottom: '15px' }}>
            {message}
          </Typography>
        )}
        <TextField
          fullWidth
          margin="normal"
          id="email"
          name="email" 
          label="Email"
          variant="outlined"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password" 
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant="contained"
          style={{ backgroundColor: '#101460', color: '#fff', marginTop: '20px' }}
          onClick={handleLogin}
        >
        Login
        </Button>
        <Typography style={{ textAlign: 'center', marginTop: '20px' }}>
          New here?{' '}
          <Link component="button" variant="body2" onClick={() => navigate("/register")}>
            Register a new account
          </Link>
        </Typography>
        <Typography style={{ textAlign: 'center', marginTop: '20px' }}>
            Forgot Password?{' '}
            <Link component="button" variant="body2" onClick={() => navigate("/resetPassword")}>
              Reset Password
            </Link>
        </Typography>    
      </Card>
    </Grid>
  </Grid>
  );
}

export default LoginPage;
