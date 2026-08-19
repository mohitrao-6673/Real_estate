"use client"

import React, { useEffect, useState } from 'react'
import Sidebaar from '../../components/propertyListing/SideBaar'
import ListingSide from '../../components/propertyListing/ListingSide'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function page() {

  let router = useRouter()
  let user = useSelector((store) => store.userStore.loginDetails)
  let token = useSelector((store) => store.userStore.token)
  let location = usePathname()
  let [properties, setProperties] = useState([])
  let [loading, setLoading] = useState(true)



  // filers-state
  let [filters, setFilters] = useState({
    city: '',
    propertyType: [],
    bhk: '',
    maxPrice: 100000000,
    amenities: [],
    furnishing: [],
    sort: 'latest',
  })

 /// console.log(location)
  useEffect(() => {
    let queryParams = new URLSearchParams(location.search)
    let city = queryParams.get('city') || ''
    let type = queryParams.get('type') || ''
    let bhk = queryParams.get('bhk') || ''

    let initialFilters = {
      ...filters,
      city,
      propertyType: type ? [type] : [],
      bhk
    }

    setFilters(initialFilters)
    setProperties(initialFilters)
  }, [location.search, user])



  //  property fetching
  let fetchProperties = async (currentFilters) => {
    try {
      setLoading(true)
      let params = new URLSearchParams()
      if (currentFilters.city) params.append('city', currentFilters.city)
      if (currentFilters.propertyType.length > 0)
        params.append('propertyType', currentFilters.propertyType.join(','))
      if (currentFilters.bhk) params.append('bhk', currentFilters.bhk)
      if (currentFilters.maxPrice) params.append('maxPrice', currentFilters.maxPrice)
      if (currentFilters.sort) params.append('sort', currentFilters.sort)
      if (currentFilters.furnishing && currentFilters.furnishing.length > 0) params.append('furnishing', currentFilters.furnishing.join(','))


    }
    catch (error) {

    }
  }




  return (
    <>
      <section className='py-8 bg-gray-100' >

        <div className=' max-w-[1320px]  mx-auto ' >

          <div className='grid lg:grid-cols-[25%_auto] sm:grid-cols-[30%_auto] grid-cols-1 lg:gap-[30px] gap-[15px] ' >

            <Sidebaar />
            <ListingSide />
          </div>

        </div>

      </section>
    </>
  )
}
