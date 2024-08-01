import React, { useState } from 'react';
import { Button, TextField, Card, Typography, CircularProgress, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { reset_password } from '../redux/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const error = useSelector(state => state.user.error)
    const [message, setMessage] = useState(null)

    const onSubmit = async(e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setMessage("Email field cannot be empty.");
            return;
        }    
        try{
            dispatch(reset_password({email}));
            navigate('/')
        } catch(err){
            console.error(error);
            setMessage(error || "Failed to send email");
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Grid item xs={11} sm={8} md={4}>
            <Card style={{ padding: '30px', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                <Typography variant="h4" component="div" style={{ textAlign: 'center', marginBottom: '20px', color: '#101460' }}>
                    Reset Password
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
                label="email"
                variant="outlined"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#101460', color: '#fff', marginTop: '20px' }}
                onClick={onSubmit}
                >
                Send Mail
                </Button> 
            </Card>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;