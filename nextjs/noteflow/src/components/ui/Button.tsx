import React from 'react'
import clsx from "clsx" 

interface Button{
    title:string,
    color: "primary" | "secondary",
    className?:string
}

const colorStyles = {
    primary : "text-white bg-accent-default",
    secondary : "text-black bg"
}


const Button = ({title,color}:Button) => {
    
  return (
    <div className={`${colorStyles[color]} `}>
        Button
    </div>
  )
}

export default Button