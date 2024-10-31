import React, { useState } from 'react'
import { Card,CardContent,CardDescription,CardTitle,CardFooter, CardHeader } from '@/components/ui/card'
import Slacklogo from '.../fonts/slack-logo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator'
import slacklogo from '@/app/fonts/slack-log.png'
import {FaGoogle} from "react-icons/fa"
import { FaGithub } from 'react-icons/fa'
import { SignInFlow } from '@/app/Types'

interface SignInProps{
     setState: (state:SignInFlow) => void
}

const SignIn = ({setState}:SignInProps) => {
    
  return (
    <Card className='border-none p-5'>
        <CardHeader className="text-3xl font- text-[#1c1c1c] relative right-3 ">
        {/* <CardTitle className="flex items-center space-x-2">
            <img src={slacklogo} alt="Slack Logo" className="w-8 h-8" />
            <span>Slack</span>
        </CardTitle> */}
        <p>Sign In to Continue</p>
        </CardHeader>
        <CardDescription className='relative left-4 -top-5'>We suggest using the email adress that you use at work
        </CardDescription>

        <CardContent className='space-y-5 px-0 pb-0 pt-1'>
            <form className='space-y-2.5'>
                <Input
                disabled={false}
                value=''
                type="Email"
                onChange={()=>{}}
                placeholder='name@work-email.com'
                required
                />
                <Input
                disabled={false}
                value=''
                type="password"
                onChange={()=>{}}
                placeholder='Password'
                required
                />
                <div className='flex w-full justify-center'>
                <Button type="submit" className='w-11/12  bg-[#611f69] ' size="lg" disabled={false} >Continue</Button>

                </div>
            </form>
            <Separator/>
            <div>
                
                <Button type='submit' className='w-full relative' 
                 disabled={false} 
                 onClick={()=>{}}
                 variant="outline"
                 >
                <FaGoogle className='size-5 absolute top-2.5 left-2.5 '/>
                Continue with Google</Button>
                <Button type='submit' className='w-full relative' 
                 disabled={false} 
                 onClick={()=>{}}
                 variant="outline"
                 >
                <FaGithub className='size-5 absolute top-2.5 left-2.5 '/>
                Continue with Github</Button>
            </div>
            <p className='text-md text-muted-foreground text-center'>
            Dont have an account? <span onClick={()=>setState("signUp")} className='text-sky-700 hover:underline cursor-pointer '>Sign up to existing workspace</span></p>
        </CardContent>
    </Card>
  )
}

export default SignIn