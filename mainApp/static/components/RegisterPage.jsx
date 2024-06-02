import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Button, TextField, Card, Typography, CircularProgress, Link, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { adminState } from '../store/atoms/admin';
import '../index.css'; // Import updated styles

function RegisterPage() {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const setAdminRecoil = useSetRecoilState(adminState);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (admin.email.trim() === "" || admin.password.trim() === "") {
      setMessage("Email/Password field cannot be empty.");
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8000/register_api",
          {
            username: admin.email,
            password: admin.password,
          }
        );

        setAdminRecoil({
          email: admin.email,
          username: admin.email.split("@")[0].toUpperCase(),
          isLoggedIn: true,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", admin.email);

        setMessage(null);
        toast.success(response.data.message);
        navigate("/courses");
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Registration failed. Please try again.");
        setIsLoading(false);
      }
    }
  };

  return (
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
            id="email"
            label="Email"
            variant="outlined"
            type="text"
            value={admin.email}
            onChange={(e) => setAdmin((prev) => ({ ...prev, email: e.target.value }))}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={admin.password}
            onChange={(e) => setAdmin((prev) => ({ ...prev, password: e.target.value }))}
          />
          <Button
            fullWidth
            variant="contained"
            className="button"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Register"}
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
