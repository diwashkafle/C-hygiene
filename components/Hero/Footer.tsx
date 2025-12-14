import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
     <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-8">
            <Link href={"/"}>
            <div className='w-full flex flex-col items-center md:items-start'>
                <Image
                src={"/logo-footer.svg"}
                alt="Company Logo"
                width={130}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-bold mb-4">C. Hygiene Industries Pvt. Ltd.</h3>
            </div>
            </Link>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-green-400">उपयोगी लिङ्कहरू</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">गृहपृष्ठ (Home)</a></li>
                <li><a href="#about" className="hover:text-white">हाम्रो बारेमा (About Us)</a></li>
                <li><a href="/C-organic" className="hover:text-white">उत्पादनहरू (Products)</a></li>
                <li><a href="#contact" className="hover:text-white">सम्पर्क (Contact)</a></li>
                <li><a href="/admin/dashboard" className="hover:text-white">प्रवेश (Dashboard)</a></li>
              </ul>
            </div>

            <div className='flex flex-col items-center md:items-start'>
              <h3 className="text-lg font-bold mb-4 text-green-400">ठेगाना</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <MapPin size={16} /> ललितपुर-२८, नेपाल
                </li>
                <li className="flex items-center gap-2">
                   <Clock size={16} /> आइतबार - शुक्रबार (१०:०० - ५:००)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 bg-black py-4 px-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} C. Hygiene Industries Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer