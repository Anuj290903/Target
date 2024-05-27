import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Button, TextField, Card, Typography, CircularProgress, Link, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { adminState } from '../store/atoms/admin';
import "../index.css"; // Ensure you have your styles here

function LoginPage() {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const setAdminRecoil = useSetRecoilState(adminState);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (admin.email.trim() === "" || admin.password.trim() === "") {
      setMessage("Email/Password field cannot be empty.");
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8000/login",
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
        setIsLoading(false);
        navigate("/courses");
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Login failed. Please try again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
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
            value={admin.email}
            onChange={(e) => setAdmin((prev) => ({ ...prev, email: e.target.value }))}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password" 
            label="Password"
            variant="outlined"
            type="password"
            value={admin.password}
            onChange={(e) => setAdmin((prev) => ({ ...prev, password: e.target.value }))}
          />
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#101460', color: '#fff', marginTop: '20px' }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <Typography style={{ textAlign: 'center', marginTop: '20px' }}>
            New here?{' '}
            <Link component="button" variant="body2" onClick={() => navigate("/register")}>
              Register a new account
            </Link>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
