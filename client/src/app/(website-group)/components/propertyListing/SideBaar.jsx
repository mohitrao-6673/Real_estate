import React from "react";
import { FaFilter } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

export default function Sidebaar() {
  return (
    <>
      <section className=" p-3 bg-white    ">
        <div className=" flex flex-col gap-3 ">
          {/* filter */}
          <div className="flex justify-between  items-center ">
            <div className="flex items-center gap-2 ">
              <FaFilter className=" text-[12px] text-green-600 " />
              <span className=" font-semibold text-[15px] "> Filters</span>
            </div>
            <span className=" text-[13px] font-semibold "> Reset </span>
          </div>

          {/* location-search */}
          <div className="flex flex-col gap-2 mt-2 sm:block hidden ">
            <div className=" flex items-center  bg-gray-100 rounded-[10px] ">
              <span className=" px-2 ">
                <IoSearchOutline className="  " />
              </span>
              <div className="w-full flex items-center ">
                <input
                  type="text"
                  className="w-full py-1 px-1 outline-none
                              placeholder:text-gray-400 placeholder:text-[14px] 
                              "
                  placeholder="search by location"
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>

          {/* price-range] */}
          <div className=" flex flex-col    mt-2 ">
            <div className=" flex items-center  justify-between ">
              <p className="text-[15px] font-semibold "> Price Range </p>

              <p className="text-[13px] font-semibold text-green-600 ">
                {" "}
                $ 20.00 Cr.{" "}
              </p>
            </div>

            <div className=" w-full mt-2 ">
              <input type="range" className=" w-full " />
            </div>

            <div className=" flex items-center  justify-between text-[12px]  text-gray-500 ">
              <p className=" "> $1L </p>

              <p className=" "> $ $20 Cr. </p>
            </div>
          </div>

          {/* Propery Type] */}
          <div className=" flex flex-col gap-1   mt-2 ">
            <p className="text-[15px] font-semibold "> Propery Type </p>

            <div className=" flex sm:flex-col flex-row sm:gap-1 gap-4 flex-wrap ">
              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Flat/Apartment </p>
              </div>

              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Flat/Apartment </p>
              </div>
              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Flat/Apartment </p>
              </div>

              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Flat/Apartment </p>
              </div>
              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Flat/Apartment </p>
              </div>
            </div>
          </div>

          {/* Furnishing */}
          <div className=" flex flex-col gap-1   mt-2 ">
            <p className="text-[15px] font-semibold "> Furnishing </p>

            <div className=" flex sm:flex-col flex-row sm:gap-1 gap-4 flex-wrap ">
              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Furnished </p>
              </div>

              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Semi-Furnished </p>
              </div>
              <div className=" flex items-center gap-2  text-[13px] text-gray-700 ">
                <input type="checkbox" className=" " />
                <p> Unfurnished </p>
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className=" flex flex-col gap-2   mt-2 ">
            <p className="text-[15px] font-semibold "> BHK(Bedrooms) </p>

            <div className=" flex flex-wrap gap-4 ">
              <p className="bg-gray-100 cursor-pointer  w-[40px] h-[40px] rounded-[8px] flex items-center justify-center font-semibold ">
                1
              </p>
              <p className="bg-gray-100 cursor-pointer w-[40px] h-[40px] rounded-[8px] flex items-center justify-center font-semibold ">
                1
              </p>
              <p className="bg-gray-100 cursor-pointer w-[40px] h-[40px] rounded-[8px] flex items-center justify-center font-semibold ">
                1
              </p>
              <p className="bg-gray-100 cursor-pointer w-[40px] h-[40px] rounded-[8px] flex items-center justify-center font-semibold ">
                1
              </p>
              <p className="bg-gray-100 cursor-pointer w-[40px] h-[40px] rounded-[8px] flex items-center justify-center font-semibold ">
                1
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
