import { createSlice } from "@reduxjs/toolkit";

const Theme=createSlice({
    name:'Theme',
    initialState:{
        theme:false,
    },
    reducers:{
        changeTheme:(state,action)=>{
            state.theme=action.payload
        }
    }
})

export const {changeTheme} = Theme.actions

export default Theme.reducer