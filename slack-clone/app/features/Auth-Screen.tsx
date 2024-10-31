"use client"

import { SignInFlow } from "@/app/Types"
import React, { useState } from "react"
import SignIn from "./auth/sign-in"
import SignUp from "./auth/sign-up"

export const AuthScreen = () =>{
    const [state,setState] = useState<SignInFlow>("signIn")
    return(
        <div className="flex items-center justify-center h-screen bg-[#611f69]">
           <div className="md:h-auto md:w-[420px]">
                {state == "signIn" ? 
                (<SignIn setState={setState}/> )
                :
                 (<SignUp setState={setState}/>)
                }
           </div>
        </div>
    )
}

