import { createSlice } from "@reduxjs/toolkit";

const Cat_Gen_Pgno=createSlice({
    name:'Cat_Gen_Pgno',
    initialState:{ 
        Category:false,
        Genre:false,
        Pgno:1,
        Search:'', 
    },
    reducers:{
        updateState:(state,action)=>{
            state.Category =action.payload.Category
            state.Genre =action.payload.Genre
            state.Pgno=action.payload.Pgno
            state.Search=''
            console.log('Coming here',action.payload,'And orignal category',state.Category)
        },
        updatePgno:(state,action)=>{
            state.Pgno = action.payload
        }
        ,updateSearch:(state,action)=>{
            state.Search = action.payload

        }
    }
})
export const {updateState,updateSearch,updatePgno} = Cat_Gen_Pgno.actions

export default Cat_Gen_Pgno.reducer