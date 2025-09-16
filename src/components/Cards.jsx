import React from 'react'
import image1 from '../assets/image1.avif'
import { IoIosLeaf } from "react-icons/io";
import { TbMeat } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { AddItem } from '../Redux/cartslice';
import { toast } from 'react-toastify';

const Cards = ({name,image,id,price,type}) => {
  let dispatch=useDispatch();
  return (
    <div className='w-[300px] h-[400px] bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:border-3 cursor-pointer transition-all  border-green-300'>
      <div className='w-[100%] h-[60%] overflow-hidden rounded-lg'>
      <img src={image} alt="Pancakeimage" className='object-cover  pt-2 rounded-lg rounded-t-lg' />
      </div>
      <div className='text-2xl font-semibold'>
{name}      </div>
      <div className='w-[100%] flex justify-between items-center'>
      <div className='text-lg font-bold text-green-500'> Rs {price}/-</div> 
     <div className='flex justify-center items-center gap-2 text-green-500 text-lg font-semibold'>{type==="veg"? <IoIosLeaf />:<TbMeat />}   <span>{type}</span></div>

      </div>
<button
  className='w-full p-3 rounded-lg text-gray-700 hover:bg-green-300 cursor-pointer transition-all duration-500 bg-green-200'
  onClick={() => {
    dispatch(AddItem({ id: id, name: name, price: price, image: image, qty: 1 }));
    toast.success("Item added");
  }}
>
  Add to cart
</button>

 </div>
  )
}

export default Cards
