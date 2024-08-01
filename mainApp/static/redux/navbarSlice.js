import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
}

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        openNav(state){
            state.isOpen = true
        },
        closeNav(state){
            state.isOpen = false
        }
    }
})

export const {openNav, closeNav} = navbarSlice.actions;
export default navbarSlice.reducer;