import Image from 'next/image'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='absolute inset-0  w-fit text-white'>
        <div className='flex flex-col p-[1.5vw] gap-[1.5vw]'>
            <div className='w-[4.3vw] h-[4.3vw]'>
                <Image src='/assets/svg/logoo.svg' width={100} height={100} className='w-full h-full object-cover' alt='logo' />
            </div>
           
          
            <div className='flex flex-col pt-[3vw] pl-[2vw] gap-[2.2vw]'>  

                  <div className='flex gap-[1vw] items-center cursor-pointer'>           
            <div className='h-[1.7vw] w-fit items-center'>
                <Image src='/assets/svg/earth-logo.svg' width={100} height={100} className='w-full h-full object-contain' alt='logo' />
            </div>
            <p className='font-display text-[0.9vw]'>CCUS around the world</p>
            </div>

            <div className='flex gap-[1vw] items-center cursor-pointer'>

            <div className='h-[2vw] w-[2vw]'>
                <Image src='/assets/svg/flask-logo.svg' width={100} height={100} className='w-full h-full object-contain' alt='logo' />
            </div>
             <p className='font-display text-[0.9vw]'>Capture technologies lab</p>
            </div>

            <div className='flex gap-[1vw] items-center cursor-pointer'>

            <div className='h-[1.9vw] w-[1.9vw]'>
                <Image src='/assets/svg/bottle-logo.svg' width={100} height={100} className='w-full h-full object-contain' alt='logo' />
            </div>
             <p className='font-display text-[0.9vw]'>CO2 Utilization</p>
            </div>

            <div className='flex gap-[1.5vw] items-center cursor-pointer'>

            <div className='h-[2.5vw] w-[2vw]'>
                <Image src='/assets/svg/bulb-logo.svg' width={100} height={100} className='w-full h-full object-contain' alt='logo' />
            </div>
             <p className='font-display text-[0.9vw]'>Stakeholder engagement</p>
            </div>

            <div className='flex gap-[1.5vw] items-center cursor-pointer'>

            <div className='h-[1.7vw] w-[1.7vw]'>
                <Image src='/assets/svg/chain-logo.svg' width={100} height={100} className='w-full h-full object-contain' alt='logo' />
            </div>
             <p className='font-display text-[0.9vw]'>Value chains & business cases</p>
            </div>

            <div className='flex gap-[1.5vw] items-center cursor-pointer'>

            <div className='h-[2vw] w-[2vw]'>
                <Image src='/assets/svg/netzero-logo.svg' width={100} height={100} className='w-full h-full object-contain' alt='logo' />
            </div>
             <p className='font-display text-[0.9vw]'>Net zero</p>
            </div>

            
            </div>
        </div>
        
      
    </div>
  )
}

export default Sidebar
