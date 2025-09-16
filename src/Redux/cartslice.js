import { createSlice } from "@reduxjs/toolkit";

const cartslice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        AddItem:(state,action)=>{
           let existingitem= state.find((item)=>item.id===action.payload.id)
           if(existingitem){
           return state.map((item)=>(item.id===action.payload.id?{...item,qty:item.qty+1}:item))
           }
           else{
            state.push(action.payload)
           }
            
        },
      RemoveItem: (state, action) => {
  return state.filter((item) => item.id !== action.payload);
},
    IncrementQty:(state,action)=>{
        return state.map((item)=>(item.id===action.payload.id?{...item,qty:item.qty+1}:item))
    },
    DecrementQty:(state,action)=>{
        return state.map((item)=>(item.id===action.payload.id?{...item,qty:item.qty-1}:item))
    }

    }
})
export const {AddItem,RemoveItem,IncrementQty,DecrementQty}= cartslice.actions
export default cartslice.reducer