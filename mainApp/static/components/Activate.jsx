import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {verify} from '../redux/userSlice.js';
import { useDispatch } from 'react-redux';

const Activate = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { uid, token } = useParams()
    const [verified, setVerified] = useState(false);

    const verify_account = async(e) => {
        console.log(uid);
        console.log(token);
        dispatch(verify({uid, token}));
        setVerified(true);
    };

    if (verified) {
        navigate("/")
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
)};

export default Activate;