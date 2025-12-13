import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <main className='flex w-full justify-center items-center p-3 sm:px-10 bg-gray-100'>
        <div className='flex lx:w-[1504px] justify-between w-full items-center'>
        <section>
        <Image 
        src={"/logo.svg"}
        alt='logo'
        height={40}
        width={50}
        />
        </section>

        <section className='flex text-lg h-full items-center gap-5 sm:gap-20'>
            <Link className='hover:underline' href={"#about"}>हाम्रो बारेमा</Link>
            <Link className='hover:underline' href={"#contact"}>सम्पर्क जानकारी</Link>
            <Link className='hidden sm:flex' href={"/C-organic"}>
            <Button className=' text-white  bg-green-700 text-lg  px-4 py-2 rounded-md'>
            जैविक उत्पादनहरू
            </Button>
            </Link>
        </section>
        </div>
    </main>
  )
}

export default Header