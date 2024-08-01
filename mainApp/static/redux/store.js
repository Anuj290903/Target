import userReducer from './userSlice.js'
import navbarReducer from './navbarSlice.js'
import csrfReducer from './csrfSlice.js'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    csrf: csrfReducer,
  }
})