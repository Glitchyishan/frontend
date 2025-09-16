import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import categories from "../Category";
import Cards from "../components/Cards";
import food_items from "../food";
import { dataContext } from "../Context/UserContext";
import { MdCancel } from "react-icons/md";
import Card2 from "../components/Card2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const { Cate, setCate, input, setInput, showCart, setshowCart } = useContext(dataContext);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName"); 
    if (!token) {
      navigate("/login"); 
    } else {
      setUserName(name || "User");
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); 
    toast.success("Logged out successfully");
    navigate("/login");
  };

  function filter(category) {
    if (category === "All") {
      setCate(food_items);
    } else {
      const formattedCategory = category.toLowerCase().replace(" ", "_");
      const newlist = food_items.filter(
        (item) => item.food_category === formattedCategory
      );
      setCate(newlist);
    }
  }

  const items = useSelector((state) => state.cart);
  const subtotal = items.reduce((total, item) => total + item.qty * item.price, 0);
  const deliveryfee = 20;
  const taxes = (subtotal * 0.5) / 100;
  const grandtotal = Math.floor(subtotal + deliveryfee + taxes);

  return (
    <div className="bg-slate-200 w-full min-h-[100vh]">
      <Nav />

      
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md mb-4 rounded-lg">
        <h2 className="text-green-700 text-xl font-semibold">
          Welcome, {userName}!
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {!input}

      <div className="flex flex-wrap justify-center items-center gap-6 w-[100%]">
        {categories.map((item) => (
          <div
            key={item.name}
            className="w-[140px] h-[150px] gap-5 bg-white flex flex-col items-start p-5 justify-start text-[18px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-100 cursor-pointer transition-all duration-500"
            onClick={() => filter(item.name)}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>

      <div className="w-[100%] flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8">
        {Cate.map((item) => (
          <Cards
            key={item.id}
            name={item.food_name}
            image={item.food_image}
            price={item.price}
            id={item.id}
            type={item.food_type}
          />
        ))}
      </div>

    
      <div
        className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 overflow-auto transition-all duration-500 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="w-[100%] flex justify-between items-center">
          <span className="text-green-400 text-[18px] font-semibold">Order Items</span>
          <MdCancel
            className="text-green-400 text-[18px] font-semibold w-[30px] h-[20px] cursor-pointer hover:text-gray-500 transition-all"
            onClick={() => setshowCart(false)}
          />
        </header>

        {items.length > 0 && (
          <>
            <div className="w-full mt-9 flex flex-col gap-8">
              {items.map((item) => (
                <Card2
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  id={item.id}
                  qty={item.qty}
                />
              ))}
            </div>
            <div className="w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8">
              <div className="w-full flex justify-between items-center">
                <span className="text-md text-gray-600 font-semibold">Subtotal</span>
                <div className="text-md text-green-600 font-semibold">Rs {subtotal}/-</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="text-md text-gray-600 font-semibold">Delivery Charge</span>
                <div className="text-md text-green-600 font-semibold">Rs {deliveryfee}/-</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="text-md text-gray-600 font-semibold">Taxes</span>
                <div className="text-md text-green-600 font-semibold">Rs {taxes}/-</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="text-md text-gray-600 font-semibold">Grand Total</span>
                <div className="text-md text-green-600 font-semibold">Rs {grandtotal}/-</div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-3">
              <button
                className="w-[80%] p-3 rounded-lg text-gray-700 hover:bg-green-300 cursor-pointer transition-all duration-500 bg-green-200"
                onClick={() => toast.success("Order Placed")}
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
