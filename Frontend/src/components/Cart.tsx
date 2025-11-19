import React from "react";
import { Button, Chip, ButtonBase, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { removeItem, updateQty, clearCart } from "../store/cartSlice";
import type { CartItem } from "../store/cartSlice";
import { HiDotsVertical } from "react-icons/hi";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.cart.items) as CartItem[];

  const total = items.reduce((s, it) => s + Number(it.newPrice) * it.qty, 0);

  return (
    <div className="min-h-screen pt-32">
      <div className="fixed top-[8vh] left-0 right-0 z-50 bg-white border-b-2 border-gray-400 shadow-sm">
        <h1 className="text-3xl font-bold text-center py-5">Cart Details:</h1>
      </div>

      <div className="w-3/5 p-12">
        {items.map((item, index) => (
          <ButtonBase
            key={index}
            sx={{
              marginBottom: "20px",
              border: "1px solid black",
              cursor: "default",
            }}
            className="w-full h-52 sm:h-56 md:h-60 flex p-0 transition-all duration-500 border border-gray-300 rounded  relative overflow-hidden "
            // onClick={() => console.log("Card clicked:", item.title)}
          >
            <div className="flex items-center justify-center h-full bg-white flex-shrink-0 w-[40%]">
              <img
                src={item.img}
                alt={item.title}
                className="lg:w-full lg:h-full sm:w-[200px] md:w-[250px] sm:h-[180px] md:h-[200px] p-5"
              />
            </div>
            {/* Best Sellers */}
            {item.company === "McLaren" && (
              <div className="absolute left-2 top-2 md:left-5 md:top-5 z-10">
                <Chip label="Best Seller" color="primary" size="small" />
              </div>
            )}
            <div className="h-full w-full p-2 md:p-4 flex flex-col justify-center items-start gap-1 md:gap-3 bg-gray-100 relative">
              <div>
                <h3 className="text-sm sm:text-base md:text-lg mb-2">
                  {item.title}
                </h3>
              </div>
              <div>
                <Chip
                  label={item.company}
                  variant="filled"
                  sx={{
                    fontSize: { xs: "11px", sm: "12px", md: "14px" },
                    p: "10px",
                    backgroundColor: "black",
                    color: "white",
                    height: { xs: 22, sm: 24, md: 28 },
                  }}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 ">
                <div className="flex justify-center items-center gap-2">
                  <p className="text-sm md:text-lg font-bold">
                    ${item.newPrice}.00{" "}
                  </p>
                  <p className="line-through text-xs md:text-sm">
                    ${item.prevPrice}{" "}
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-between items-center    ">
                <p className="text-green-700 font-bold text-xl  md:text-sm">
                  You Save:${Number(item.newPrice) - Number(item.prevPrice)}{" "}
                </p>
                <div className="flex items-center justify-center gap-1">
                  {/*  */}

                  {/*  */}
                  <button
                    className="h-8 w-8 bg-black text-white flex justify-center items-center rounded-full cursor-pointer hover:bg-[#bbbbbb] hover:text-black  transition"
                    onClick={() =>
                      dispatch(
                        updateQty({
                          id: item.id,
                          qty: Math.max(0, item.qty - 1),
                        })
                      )
                    }
                  >
                    <FaMinus />
                  </button>
                  <p className="text-xl font-bold px-4 border-1 mx-2">
                    {" "}
                    {item.qty}{" "}
                  </p>
                  <button
                    className="h-8 w-8 bg-[#1565c0] text-white flex justify-center items-center rounded-full cursor-pointer hover:bg-[#a2ceff] hover:text-[#1565c0] transition"
                    onClick={() =>
                      dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
                    }
                  >
                    {" "}
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="absolute top-2 right-2 md:top-5 md:right-5 text-base md:text-xl cursor-pointer">
                <HiDotsVertical />
              </div>
            </div>
          </ButtonBase>
        ))}
      </div>
      {/*  Cart Side Page ========================================= */}
      <div className="border-2 border-black fixed right-12 top-42 w-[28%] flex flex-col gap-2.5 px-2.5 py-5 bg-white max-h-[calc(100vh-15rem)] overflow-hidden">
        <h2 className="font-extrabold text-lg p-2.5">Cart Details:</h2>
        <hr className="h-px bg-gray-400" />

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="p-2">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={String(it.id)} className="flex items-center gap-2 p-1">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <p className="font-bold">{it.title}</p>
                  <p className="text-gray-600">
                    ${it.newPrice} x {it.qty}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <hr className="h-px bg-gray-400" />

        <div className="flex justify-between items-center py-2">
          <span className=" text-xl font-bold">Total :</span>
          <span className="font-bold text-xl text-green-700">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-1">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // TODO: wire checkout flow
            }}
          >
            Checkout
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(clearCart())}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
