"use client"


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flip, toast, ToastContainer } from 'react-toastify'
import { MdErrorOutline } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import PersonalInfo from '../../component/profileComponent/PersonalInfo'
import ProfileUpdate from '../../component/profileComponent/ProfileUpdate'
import ChangePassword from '../../component/profileComponent/ChangePassword'


export default function profile() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let [changePasswordDiv, setChangePasswordDiv] = useState(false)
  let [profileUpdateDiv, setprofileUpdateDiv] = useState(false)
  let token = useSelector((store) => store.userStore.token)
  let [error, setError] = useState('')
  let [loader, setLoader] = useState(false)



  // change password function
  let changePassword = (event) => {
    event.preventDefault()
    setError('')
    setLoader(true)
    let obj = {
      oldPassword: event.target.oldPassword.value,
      newPassword: event.target.newPassword.value
    }
    axios.post(`${apiBaseUrl}web/auth/changepassword-after-login`, obj, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          event.target.reset()
          toast.success(finalRes.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });
        }
        else {
          setError(finalRes.message)
        }
        setLoader(false)
      })
  }



  let [staticPath, setStaticPath] = useState('')
  let [user, setUser] = useState([])
  let gerProfile = () => {
    axios.get(`${apiBaseUrl}web/user/get-profile`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setUser(finalRes.data)
          setStaticPath(finalRes.staticpath)
        }
        else {
          //console.log(finalRes.message)
        }

      })
  }
  useEffect(() => {
    gerProfile()
  }, [token])



  return (
    <>
      <section >
        <ToastContainer />
        <section className='max-w-2xl mx-auto min-h-screen p-4 ' >

          {/* <!-- profile header --> */}
          <header className=' max-w-fit mx-auto  my-[20px]    ' >
            <h1 className='sm:text-[40px] text-[28px]  text-center font-semibold tracking-tight ' > Personal Profile </h1>
            <p className='text-[17px] text-gray-600 text-center  ' >
              Manage Your Personal Information and Account Settings.
            </p>
          </header>


          {/* <!-- profile body --> */}
          <div className=" w-full bg-white shadow-xl rounded-2xl  ">


            <div className=' rounded-[12px] sm:p-4 p-2  ' >
              {/* profile pic and name */}
              <div className=' flex items-center gap-6 mb-6 ' >
                <div className='w-[100px] h-[100px]  ' >
                  <img
                    src={` ${apiBaseUrl}${staticPath}${user.profilePic} `}
                    alt="" className=' w-full h-full rounded-full ' />

                </div>
                <div className=' flex flex-col gap-2 ' >
                  <h1 className=' sm:text-[20px] text-[17px] font-semibold ' >
                    {user.firstName} {user.lastName}

                  </h1>
                  <span className=' py-1 px-2 font-semibold rounded text-center w-fit text-[14px] bg-indigo-100 text-indigo-600 ' >
                    {user.role}
                  </span>
                </div>
              </div>


              <PersonalInfo changePasswordDiv={changePasswordDiv} setChangePasswordDiv={setChangePasswordDiv} setprofileUpdateDiv={setprofileUpdateDiv} user={user} />



              <ChangePassword changePasswordDiv={changePasswordDiv} setChangePasswordDiv={setChangePasswordDiv} error={error} changePassword={changePassword} loader={loader} />



              <ProfileUpdate user={user} staticPath={staticPath} setprofileUpdateDiv={setprofileUpdateDiv} profileUpdateDiv={profileUpdateDiv} gerProfile={gerProfile} />


            </div>


          </div>

        </section>
      </section>
    </>
  )
}
