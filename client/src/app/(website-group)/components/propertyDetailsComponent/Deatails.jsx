import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { TbMapPinCode } from "react-icons/tb";
import { BiSolidBadge } from "react-icons/bi";
import Link from "next/link";
import { IoMdChatbubbles } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setActiveChat, setChat } from "@/app/slices/chatSlice";

export default function Deatails({
  ameneties,
  property,
  sendInquiry,
  loader,
  success,
  status,
}) {
  let dispatch = useDispatch()
  let user = useSelector((store) => store.userStore.loginDetails);
  let token = useSelector((store) => store.userStore.token);
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
  let router = useRouter();


  // handle chat buyer with seller
  let handleChat = async () => {
    if (!user) router.push("/pages/auth");
    if (user && user.role !== "buyer")
      return alert("Only Buyer Can Chat with seller ");

    try {
      // to create chat
      let response = await axios
        .post(
          `${apiBaseUrl}web/chat/create`,
          {
            propertyId: property._id,
            provideSellerId: property.seller._id,
            provideBuyerId: user._id,
          },
          { headers: { Authorization: ` Bearer ${token} ` } },
        )
      const chat = response.data?.chat;

      // send message
      let messageResponse = await axios.post(
        `${apiBaseUrl}web/chat/send`,
        {
          text: ` i am intrested in this property ${property.title} `,
          image: property.images[0],
          chatId: chat._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const updatedChat = messageResponse.data?.chat || chat;
      dispatch(setActiveChat(updatedChat))
      router.push(`/pages/message?chatId=${updatedChat._id}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to start chat"
      );
      console.error(
        "Start chat error:",
        error
      );
    }
  };

  return (
    <>
      <section className=" p-2  ">
        <section className="grid grid-cols-1 gap-2 ">
          {/*property details */}
          <div className=" flex flex-col gap-2 ">
            <h1 className="md:text-[30px] sm:text-[26px] text-[22px] font-semibold capitalize ">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 ">
              <span>
                <IoLocation className="text-green-600 " />
              </span>
              <span className=" text-gray-600 capitalize  text-[14px] ">
                {property.city} {property.area}
              </span>
            </div>

            <div className="grid lg:grid-cols-5 md:grid-cols-4  sm:grid-cols-3 grid-cols-2  mt-8  gap-4  ">
              <div className=" flex flex-col items-center py-2 bg-gray-50 rounded-[10px]  ">
                <FaHome />
                <span className=" mt-1 font-semibold text-[18px] ">
                  {property.bhk}
                </span>
                <p className="sm:text-[12px] text-[10px] text-gray-500 font-semibold ">
                  BEDROOMS
                </p>
              </div>
              <div className=" flex flex-col items-center py-2 bg-gray-50 rounded-[10px]  ">
                <FaBath />
                <span className=" mt-1 font-semibold text-[18px] ">
                  {property.bathrooms}
                </span>
                <p className="sm:text-[12px] text-[10px] text-gray-500 font-semibold ">
                  Bathroom
                </p>
              </div>
              <div className=" flex flex-col items-center py-2 bg-gray-50 rounded-[10px]  ">
                <TbRulerMeasure />
                <span className=" mt-1 font-semibold text-[18px] ">
                  {property.areaSize}
                </span>
                <p className="sm:text-[12px] text-[10px] text-gray-500 font-semibold ">
                  SQ FT
                </p>
              </div>
              <div className=" flex flex-col items-center py-2 bg-gray-50 rounded-[10px]  ">
                <MdOutlineBedroomParent />
                <span className=" mt-1 font-semibold text-[18px] ">
                  {property.furnishing}
                </span>
                <p className="sm:text-[12px] text-[10px] text-gray-500 font-semibold ">
                  Furnishing
                </p>
              </div>
              <div className=" flex flex-col items-center py-2 bg-gray-50 rounded-[10px]  ">
                <TbMapPinCode />
                <span className=" mt-1 font-semibold text-[18px] ">
                  {property.pincode}
                </span>
                <p className="sm:text-[12px] text-[10px] text-gray-500 font-semibold ">
                  Pincode
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className=" mt-6  ">
              <h2 className=" font-semibold text-[18px] sm:mb-3 mb-1 ">
                {" "}
                Amenities{" "}
              </h2>

              <div className=" flex flex-wrap gap-4 ">
                {ameneties.length >= 1
                  ? ameneties.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className=" flex items-center gap-2 px-4  py-2 bg-gray-100 "
                      >
                        <HiBadgeCheck className=" text-green-500 " />
                        <span>{data}</span>
                      </div>
                    );
                  })
                  : "no amenities"}
              </div>
            </div>

            {/* description */}
            <div className=" mt-6 ">
              <h2 className=" font-semibold text-[18px] sm:mb-3 mb-1 ">
                {" "}
                Description{" "}
              </h2>
              <p className=" text-gray-600 sm:text-[16px] text-[14px] ">
                {property.description}
              </p>
            </div>

            <div className=" grid sm:grid-cols-2 grid-cols-1 gap-2 mt-4  ">
              <div className=" rounded-[10px] grid gap-2 grid-cols-1 p-2 bg-gray-100  ">
                <span className=" text-[14px] font-semibold flex items-center px-2 ">
                  Property Type
                </span>
                <span className=" text-[13px] text-gray-500 flex items-center px-2 ">
                  {property.propertyType}
                </span>
              </div>
              <div className=" rounded-[10px] grid gap-2 grid-cols-1 p-2 bg-gray-100 ">
                <span className=" text-[14px] font-semibold flex items-center px-2 ">
                  Property Id
                </span>
                <span className=" text-[13px] text-gray-500 flex items-center px-2 ">
                  {property._id}
                </span>
              </div>
              <div className=" rounded-[10px] grid gap-2 grid-cols-1 p-2 bg-gray-100 ">
                <span className=" text-[14px] font-semibold flex items-center px-2 ">
                  Added On
                </span>
                <span className=" text-[13px] text-gray-500 flex items-center px-2 ">
                  {property.updatedAt}
                </span>
              </div>
              <div className=" rounded-[10px] grid gap-2 grid-cols-1 p-2 bg-gray-100 ">
                <span className=" text-[14px] font-semibold flex items-center px-2 ">
                  Status
                </span>
                <span className=" text-[13px] text-gray-500 flex items-center px-2 ">
                  {property.status}
                </span>
              </div>
            </div>

            <div className=" flex flex-col gap-2 sm:w-[300px] w-full ">
              <div
                className="w-full bg-gradient-to-r from-[#392BFB] to-[#0F056E] text-white cursor-pointer p-4 rounded-[8px] w-[200px] flex flex-col mt-3  "
                fdprocessedid="9aljcb"
              >
                <h1 className=" text-[18px] uppercase ">Price</h1>
                <h2 className="text-[26px] font-semibold ">{property.price}</h2>

                <p
                  className={`w-fit py-1 text-[13px] font-semibold px-2 rounded-md ${property.status == "Sold" ? " bg-red-600 text-white " : "bg-green-600 text-white"} `}
                >
                  {property.status == "Sold"
                    ? " Sold Out "
                    : " Available For Sale "}
                </p>
              </div>

              <form
                onSubmit={sendInquiry}
                className=" flex flex-col gap-2 p-2 shadow-2xl rounded-md "
              >
                <div
                  onClick={handleChat}
                  className=" flex items-center gap-2 justify-center text-[15px] hover:bg-gray-200 rounded-md cursor-pointer p-1 w-fit mx-auto "
                >
                  <IoMdChatbubbles />
                  <span className="">Chat</span>
                </div>

                <label htmlFor="" className=" text-[14px] font-semibold ">
                  Inquiry
                </label>
                <textarea
                  placeholder="Type here your message "
                  className=" border-gray-500 w-full border p-2 rounded-lg resize-none focus:outline-none "
                  required
                  name="message"
                  rows="4"
                ></textarea>

                {status && (
                  <p className="text-xs font-semibold tracking-widest text-green-600 text-center uppercase bg-emerald-500/10 px-3 py-2 rounded-full ">
                    {success}
                  </p>
                )}

                <div className="flex items-center gap-4 ">
                  {loader ? (
                    <button
                      type="button"
                      className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   "
                    >
                      <span className="spinner"></span>
                      <span>Sending...</span>
                    </button>
                  ) : (
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer "
                      type="submit"
                    >
                      Send Inquiry
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
