import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
    name:'User',
    initialState:{
        UserData:null,
        isAuthenticated:false,
        UserFavorite:{},
        UserWatchlist:{},
    }
    ,
    reducers:{
        setUserData:(state,action)=>{
            state.UserData=action.payload
        },
        setAuthentication:(state,action)=>{
            state.isAuthenticated=action.payload
        },
        setFavorite:(state,action)=>{
            state.UserFavorite = {...state.UserFavorite,...action.payload}
        },
        deleteFavorite:(state,action)=>{
           state.UserFavorite = delete {...state.UserFavorite}[action.payload]
        },
        setWatchList:(state,action)=>{
            
            state.UserWatchlist = {...state.UserWatchlist,...action.payload}
            console.log('setting up in the watchlist',{...state.UserWatchlist,...action.payload})
        },
        deleteWatchList:(state,action)=>{
           state.UserWatchlist = delete {...state.UserWatchlist}[action.payload]
        }
    }
})
export const{setUserData,setAuthentication,setFavorite,setWatchList,deleteFavorite,deleteWatchList} = User.actions

export default User.reducer

