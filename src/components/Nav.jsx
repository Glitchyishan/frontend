import React, { useEffect } from 'react'
import { GiFoodTruck } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useContext,useState } from 'react';
import { dataContext } from '../Context/UserContext';
import food_items from '../food';
import { useSelector } from 'react-redux';
const Nav = () => {
const { input, setInput, Cate ,setCate,showCart,setshowCart } = useContext(dataContext);
      useEffect(()=>{
       let newList= food_items.filter((item)=>item.food_name.includes(input)||item.food_name.toLowerCase().includes(input))
       setCate(newList)
      },[input])

      let items=useSelector(state=>state.cart)
    console.log(items)

  return (

    <div className='max-w-full h-[100px] flex justify-between items-center md:px-8'>

        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl'>
              <GiFoodTruck className='w-[30px] h-[30px] text-green-500' />
        </div>

        <form className='w-[45%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md md:w-[70%]' onSubmit={(e)=>e.preventDefault()} >
        <IoSearch className='text-green-500 w-[20px] h-[20px] ' />
        <input type="text" placeholder='Search Itemss...' className='w-[100%] outline-none text-[16px] md:text-[20px]' onChange={(e)=>setInput(e.target.value)} value={input}/>
        </form>

         <div className='w-[60px] h-[60px] bg-white flex justify-center items-center  rounded-md  shadow-xl relative cursor-pointer 'onClick={()=>{
          setshowCart(true);
         }}>
             <span className='absolute top-0 right-2 text-green-500 font-bold text-[18px]'>{items.length}</span>
              <FaShoppingCart className='w-[30px] h-[30px] text-green-500 cursor-pointer ' />
       
        </div>

  
    </div>
  )
}

export default Nav
