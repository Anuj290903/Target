import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner'
import { Button, TextField, Card, Typography, CircularProgress, Link, Grid } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {signup} from '../redux/userSlice.js';
import '../index.css';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const dispatch = useDispatch();
  const status = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const checkLoading = status === 'loading';

  const handleRegister = async () => {
    if (email.trim() === "" || password.trim() === "" || first_name.trim == "" || last_name.trim == "") {
      setMessage("All fields are required!");
      return;
    }
    else if (re_password != password){
      setMessage("Passwords do not match.");
      return;
    }
    else {
      try{
        dispatch(signup({
          first_name,
          last_name,
          email,
          password,
          re_password
        }));
        console.log(status)
          if(status === 'signupSuccess')
          {
            setMessage(null);
            toast.success("Registration Successful");
            navigate("/EmailActivate");
          }
          else if(status === 'signupFail')
          {
            console.error(error);
            setMessage(error || "Registration failed. Please try again.");
          }
      } catch(err){
        console.error(err);
        setMessage("Registration failed. Please try again.");
      }
        return;
    }
  }
  return ( checkLoading ? <Spinner text="Loading..." /> :
    <Grid container className="page" justifyContent="center" alignItems="center">
      <Grid item xs={11} sm={8} md={4}>
        <Card className="form">
          <Typography variant="h4" component="div" className="title">
            Register Account
          </Typography>
          {message && (
            <Typography className="message">
              {message}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="normal"
            id="firstName"
            label="firstName"
            variant="outlined"
            type="text"
            placeholder="First Name*"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="lastName"
            label="lastName"
            variant="outlined"
            type="text"
            placeholder="Last Name*"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            variant="outlined"
            type="text"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="rePassword"
            label="rePassword"
            variant="outlined"
            type="password"
            placeholder="Confirm Password*"
            value={re_password}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            className="button"
            onClick={handleRegister}
          >
          Register
          </Button>
          <Typography className="subtitle">
            Already a user?{' '}
            <Link component="button" variant="body2" onClick={() => navigate("/login")}>
              Login here
            </Link>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}
export default RegisterPage;
