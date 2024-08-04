"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react"
// import loginImg from "@/public/login.jpg";

import { ImSpinner9 } from "react-icons/im";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "@/components/Sociallogin/SocialLogin";


const Loginpage = () => {
    const [isSpin, setIsSpin] = useState(false);
    const [isText, setIsText] = useState(true);
    const router = useRouter();
    const serarchParam = useSearchParams();
    const path = serarchParam.get('redirect');
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsText(false);
        setIsSpin(true);
        const email = event.target.email.value;
        const password = event.target.password.value;
       
        const res = await signIn('credentials', {
            email,
            password,
            redirect:true,
            callbackUrl : path ? path : '/'
        })

        if(res.status == 200) {
            router.push('/')
        }

        console.log(res)
        
          
        toast.success('Successfully logged in!')
            
        setIsSpin(false);
        setIsText(true);

        event.target.reset();
    }
    return (
        <div className="flex justify-center items-center  h-screen gap-10">
            <div>
                <Image src={'/login.jpg'} alt='login' width={600} height={600}></Image>
                {/* <Image src={loginImg} alt='login' ></Image> */}
            </div>
            <div className="shadow-gray-500 shadow-xl p-8 h-[600px] w-[450px] flex flex-col justify-center">
                <h1 className="text-5xl text-center mb-10">Login</h1>
                <div className="">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="email" placeholder="Enter Your Email..." className="text-black px-4 py-2 " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Password : </label>
                            <input type="password" name="password" placeholder="*********" className="text-black px-4 py-2" />
                        </div>
                        <div>
                            <button className="hover:bg-teal-700 bg-teal-500 w-full py-2 font-medium text-lg mt-2 duration-200 "><span className="flex items-center justify-center gap-4"><p className = {`${isText ? 'flex' : 'hidden'} `}>Login</p> <ImSpinner9 className = {`${isSpin ? 'flex' : 'hidden'} animate-spin text-xlregister`}/></span></button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center w-full mt-2">
                    <hr className="flex-grow border-gray-300"></hr>
                    <span className="px-4 ">or</span>
                    <hr className="flex-grow border-gray-300"></hr>
                </div>
                {/* <div className="mt-2 flex justify-center gap-4">
                    <button className="bg-teal-500 p-2 duration-200 hover:bg-teal-700 text-2xl rounded-full shadow-md shadow-gray-500"><FaGoogle /></button>
                    <button className="bg-teal-500 p-2 duration-200 hover:bg-teal-700 text-2xl rounded-full shadow-md shadow-gray-500"><FaGithub /></button>
                </div> */}
                <SocialLogin></SocialLogin>
                <div className="mt-4 text-center">
                    <p>Don't Have an account ? <span className="text-teal-500 hover:text-teal-700 duration-200 text-lg font-semibold"><Link href={'/reg'}>Sign Up</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;