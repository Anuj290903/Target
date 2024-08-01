import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    is_admin: false,
    isAuthenticated: false,
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('http://localhost:8000/auth/jwt/create/', body, config);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const checkAuthenticated = createAsyncThunk('user/checkAuth', async (_, {rejectWithValue}) => {
    const access = localStorage.getItem('access')
    if(access)
    {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };
        const body = JSON.stringify({ token: access});
        try {
            const res = await axios.post('http://localhost:8000/auth/jwt/verify/', body, config)
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
    else
    {
        return rejectWithValue(err.response.data);
    }
})

export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
    const access = localStorage.getItem('access')
    if (access) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json',
            },
        };
        try {
            const res = await axios.get('http://localhost:8000/auth/users/me/', config);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    } else {
        return rejectWithValue('No token available');
    }
});

export const signup = createAsyncThunk('user/signup', async ({ first_name, last_name, email, password, re_password }, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ first_name, last_name, email, password, re_password });
    try {
        const res = await axios.post('http://localhost:8000/auth/users/', body, config);
        return res.data;
        // Hardcoded for email. Check it for every case.
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const verify = createAsyncThunk('user/verfiy', async ({uid, token}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ uid, token });
    try {
        const res = await axios.post('http://localhost:8000/auth/users/activation/', body, config);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const reset_password = createAsyncThunk('user/resetPassword', async ({email}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });
    try {
        const res = await axios.post('http://localhost:8000/auth/users/reset_password/', body, config);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const reset_password_confirm = createAsyncThunk('user/resetPasswordConfirm', async ({uid, token, new_password, re_new_password}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
        const res = await axios.post('http://localhost:8000/auth/users/reset_password_confirm/', body, config);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.first_name = ''
            state.last_name = ''
            state.email = ''
            state.is_admin = false
            state.isAuthenticated = false
            state.access = localStorage.getItem('access')
            state.refresh = localStorage.getItem('refresh')
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('access', action.payload.access);
                localStorage.setItem('refresh', action.payload.refresh);
                state.status = 'authenticated';
                state.isAuthenticated = true;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'unauthenticated'
                state.error = action?.payload ? action.payload?.detail : 'Failed to log in'
            })
            .addCase(loadUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.isAuthenticated = true
                state.first_name = action.payload.first_name
                state.last_name = action.payload.last_name
                state.email = action.payload.email
                state.is_admin = action.payload?.is_staff
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.payload ? action.payload.detail : 'Failed to load user data';
            })
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state) => {
                state.status = 'signupSuccess';
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'signupFail';
                console.log(action.payload.email[0])
                state.error = action?.payload ? action.payload?.email[0] : 'Failed to sign up';
            })
            .addCase(reset_password_confirm.rejected, (state, action) =>{
                state.status = 'resetPasswordConfirmFail';
                state.error = action?.payload ? action.payload?.detail : 'Failed to reset password';
            })
            .addCase(reset_password.rejected, (state, action) =>{
                state.status = 'resetPasswordFail';
                state.error = action?.payload ? action.payload?.detail : 'Failed to reset password';
            })
            .addCase(checkAuthenticated.fulfilled, (state, action) => {
                state.status = 'verified';
                state.isAuthenticated = true
            })
            .addCase(checkAuthenticated.rejected, (state, action) => {
                state.status = 'idle'
                state.isAuthenticated = false
            })
            .addDefaultCase((state) => {
                //Nothing to change
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
