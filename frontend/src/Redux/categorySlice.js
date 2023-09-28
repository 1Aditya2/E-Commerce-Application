import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {axiosClient} from '../utils/axiosClient'


export const fetchCategories=createAsyncThunk('api/categories',async ()=>{
    try {
        const res=await axiosClient.get('/categories?populate=image')
        return res.data.data
    } catch (e) {
        return Promise.reject(e)
    }
})

const categorySlice=createSlice({
    name:'categorySlice',
    initialState:{
        categories:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            // console.log(action.payload,'at store');
            state.categories=action.payload
        })
        
    }
})
export default categorySlice.reducer