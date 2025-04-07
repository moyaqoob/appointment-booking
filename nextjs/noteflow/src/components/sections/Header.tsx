import React from 'react'
import logo from "@/public/assets/Logo.svg"
import Image from 'next/image'
import Button from '../ui/Button'
const Header = () => {
  console.log(logo)
  return (
    <div className='"bg-[linear-gradient(to bottom,var(--color-primary-1300),var(--color-primary-1500))] p-4'>
      <div className='flex justify-between'>

      <div className='flex gap-2'>
        <Image src={logo} alt='noteflow' />
        <span className='capitalize '>noteflow</span>
      </div>

      <div className=''>
        <ul className='flex gap-2'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Blog</li>
        </ul>
      </div>

      <div className='flex gap-2'>

        <Button title='Login' className='rounded bg-primary-1100' color='secondary'/>
        <Button title='Login' color='secondary'/>
      </div>
      </div>
    </div>
  )
}

export default Header