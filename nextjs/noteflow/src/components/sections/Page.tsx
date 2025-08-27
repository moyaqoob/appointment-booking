import React, { type ReactNode } from 'react'

export interface PageProps{
    children:ReactNode
}

const Page = ({children}:PageProps) => {
  return (
    <div>
        {children}
    
    </div>
  )
}

export default Page