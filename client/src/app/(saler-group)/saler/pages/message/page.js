"use client"

import React, { useState } from 'react'
import SideBaarMessage from '../../component/messageComponent/SideBaarMessage'
import ChatInbox from '../../component/messageComponent/ChatInbox'

export default function message() {



  let [chatIsOpen, setChatIsOpen] = useState(false)



  return (
    <>
      <section className='h-[90vh] w-full grid lg:grid-cols-[28%_auto] grid-cols-1 '>

        <div className={`h-full overflow-auto scrollbar-hide relative top-0
                    ${chatIsOpen ? 'lg:block hidden' : ' block'}
                    `}>
          <SideBaarMessage
            setChatIsOpen={setChatIsOpen}
          />
        </div>
        <div className={`w-full  h-full overflow-auto scrollbar-hide md:relative fixed ${chatIsOpen ? 'block' : 'lg:block hidden'} `}>
          <ChatInbox setChatIsOpen={setChatIsOpen} />
        </div>

      </section>
    </>
  )
}
