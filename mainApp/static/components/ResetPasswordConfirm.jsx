import React, { useState } from 'react';
import { Button, TextField, Card, Typography, CircularProgress, Link, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset_password_confirm } from '../redux/userSlice.js';

const ResetPasswordConfirm = () => {
    const [message, setMessage] = useState(null)
    const [new_password, setNewPassword] = useState('')
    const [re_new_password, setReNewPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {uid, token} = useParams()
    const error = useSelector(state => state.user.error)

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            dispatch(reset_password_confirm({uid, token, new_password, re_new_password}))
            navigate("/")
        } catch(err){
            console.error(error)
            setMessage(error || "Reset Password Failed.")
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
                id="new_password"
                name="new_password" 
                label="new_password"
                variant="outlined"
                type="password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                />
                <TextField
                fullWidth
                margin="normal"
                id="re_new_password"
                name="re_new_password" 
                label="re_new_password"
                variant="outlined"
                type="password"
                value={re_new_password}
                onChange={(e) => setReNewPassword(e.target.value)}
                required
                />
                <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#101460', color: '#fff', marginTop: '20px' }}
                onClick={onSubmit}
                >
                Reset Password
                </Button> 
            </Card>
            </Grid>
        </Grid>
    );
};

export default ResetPasswordConfirm;