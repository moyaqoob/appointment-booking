import React from 'react'
import { Card,CardContent,CardDescription,CardTitle,CardFooter, CardHeader } from '@/components/ui/card'
import Slacklogo from '.../fonts/slack-logo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator'
import slacklogo from '@/app/fonts/slack-log.png'
import {FaGoogle} from "react-icons/fa"
import { FaGithub } from 'react-icons/fa'
import { SignInFlow } from '@/app/Types'
import { useState } from 'react'
import { signIn } from '@/convex/auth';
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpProps{
     setState: (state:SignInFlow) => void
}

const SignUp = ({setState}:SignUpProps) => {
    const {signIn} = useAuthActions();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");
    const [error,setError] = useState<String>("");
    const [pending,setPending] = useState(false);
    
    

    const onPasswordSignUp = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match");
            return
        }
        setPending(true);

        signIn("password",{name,email,password,flow:"signUp"})
        .catch(()=>{
            setError("Something went wrong")
        })
        .finally(()=>{
            setPending(false);
        })
    }

  return (
    <Card className='border-none p-5'>
        <CardHeader className="text-3xl font- text-[#1c1c1c] relative right-3 ">
        {/* <CardTitle className="flex items-center space-x-2">
            <img src={slacklogo} alt="Slack Logo" className="w-8 h-8" />
            <span>Slack</span>
        </CardTitle> */}
        <p>Sign Up to Continue</p>
        </CardHeader>
        <CardDescription className='relative left-4 -top-5'>We suggest using the email adress that you use at work
        </CardDescription>

        <CardContent className='space-y-5 px-0 pb-0 pt-1'>
            <form onSubmit={onPasswordSignUp} className='space-y-2.5'>
                <Input
                disabled={pending}
                value={name}
                type="name"
                onChange={(e)=>setName(e.target.value)}
                placeholder='name'
                required
                />
                <Input
                disabled={pending}
                value={email}
                type="name"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='email'
                required
                />
                <Input
                disabled={pending}
                value={password}
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password'
                required
                />
                <Input
                disabled={pending}
                value={confirmPassword}
                type="password"
                onChange={(e)=>setconfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                required
                />
                <div className='flex w-full justify-center'>
                <Button type="submit" className='w-11/12  bg-[#611f69] ' size="lg" disabled={false} >Continue</Button>
                </div>
            </form>
            <Separator/>
            <div >
                
                <Button type='submit' className='w-full relative bottom-1 shadow-md' 
                 disabled={false} 
                 onClick={()=>{}}
                 variant="outline"
                 >
                <FaGoogle className='size-5 absolute top-2.5 left-2.5 '/>
                Continue with Google</Button>
                <Button type='submit' className='w-full relative shadow-md' 
                 disabled={false} 
                 onClick={()=>{}}
                 variant="outline"
                 >
                <FaGithub className='size-5 absolute top-2.5 left-2.5 '/>
                Continue with Github</Button>
            </div>
            <p className='text-md text-muted-foreground text-center'>
            Dont have an account? <span onClick={()=>setState("signIn")} className='text-sky-700 hover:underline cursor-pointer '>Sign in up to existing workspace</span></p>
        </CardContent>
    </Card>
  )
}

export default SignUp