"use client"


import Deatails from '@/app/(website-group)/components/propertyDetailsComponent/Deatails'
import Gallery from '@/app/(website-group)/components/propertyDetailsComponent/Gallery'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export default function page() {

    let [loader, setLoader] = useState(false)
    let [success, setSuccess] = useState('')
    let [status, setStatus] = useState(false)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.userStore.token)
    let user = useSelector((store) => store.userStore.loginDetails)
    let router = useRouter()
    let [property, setProperty] = useState([])
    let [similarproperty, setSimilarProperty] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let [ameneties, setAmeneties] = useState([])
    let [images, setImages] = useState([])
    let { id } = useParams()
    let [inquiry, setInquiry] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })




    // get  property details
    useEffect(() => {
        axios.post(`${apiBaseUrl}web/property/singleview/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {

                setProperty(finalRes.data)
                setAmeneties(finalRes.data.ameneties)
                setImages(finalRes.data.images)
                setStaticPath(finalRes.staticPath)

            })

    }, [id])

    // inquiry submit handle
    let sendInquiry = (event) => {
        event.preventDefault()
        if (!user) return router.push('/pages/auth')
        if (user.role !== 'buyer') return alert('Only Buyer Can Send Inquiries')
        setLoader(true)
        setSuccess('')
        let obj = {
            propertyId: property._id,
            message: event.target.message.value
        }
        axios.post(`${apiBaseUrl}web/inquiry/send`, obj, {
            headers: { Authorization: ` Bearer ${token} ` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    // console.log(finalRes.data)
                    setSuccess(finalRes.message)
                    setStatus(finalRes.status)
                    event.target.reset()
                    setTimeout(() => {
                        setStatus(false)
                    }, 2000);
                }
                else {
                    setStatus(finalRes.status)
                    toast.error(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                }
                setLoader(false)
            })

    }


    return (
        <>
            <section className='py-4  ' >
                <div className='max-w-[1000px]   mx-auto ' >
                    <div className=' flex flex-col  gap-[14px]  ' >

                        <Gallery images={images} />
                        <Deatails sendInquiry={sendInquiry} property={property} ameneties={ameneties} status={status} success={success} loader={loader} />

                    </div>
                </div>
            </section>
        </>
    )
}
