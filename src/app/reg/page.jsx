"use client"
import SocialLogin from "@/components/Sociallogin/SocialLogin";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
// import loginImg from "@/public/login.jpg";
// import { FaGithub, FaGoogle } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";


const RegisterPage = () => {
    const [isSpin, setIsSpin] = useState(false);
    const [isText, setIsText] = useState(true);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsText(false);
        setIsSpin(true);
        const user = {
            name : event.target.name.value,
            image : event.target.photo.value,
            email : event.target.email.value,
            password : event.target.password.value,
        }
        console.log(user);
        try {
            const  data  = await axios.post('http://localhost:3000/reg/api', user);
            console.log(data);
            if(data.status == '200') {
                toast.success('User Added Successfully!')
            }
            setIsSpin(false);
            setIsText(true);

        } catch (error) {
            setIsSpin(false);
            setIsText(true);
            toast.error('Try again')
            console.log(error)
        }
        event.target.reset();
    }
    return (
        <div className="flex flex-row-reverse justify-center items-center  h-screen gap-10">
            <div>
                <Image src={'/login.jpg'} alt='login' width={600} height={650}></Image>
                {/* <Image src={loginImg} alt='login' ></Image> */}
            </div>
            <div className="shadow-gray-500 shadow-xl p-8 h-[650px] w-[500px] flex flex-col justify-center">
                <h1 className="text-5xl text-center mb-10">Register</h1>
                <div className="">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Name : </label>
                            <input type="text" name="name" placeholder="Enter Your Name..." className="text-black px-4 py-2 " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Image : </label>
                            <input type="text" name="photo" placeholder="Photo Url..." className="text-black px-4 py-2 " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Email : </label>
                            <input type="email" name="email" placeholder="Enter Your Email..." className="text-black px-4 py-2 " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Password : </label>
                            <input type="password" name="password" placeholder="*********" className="text-black px-4 py-2" />
                        </div>
                        <div>
                            <button className="hover:bg-teal-700 bg-teal-500 w-full py-2 font-medium text-lg mt-2 duration-200 "><span className="flex items-center justify-center gap-4"><p className = {`${isText ? 'flex' : 'hidden'} `}>Sign Up</p> <ImSpinner9 className = {`${isSpin ? 'flex' : 'hidden'} animate-spin text-xlregister`}/></span></button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center w-full mt-2">
                    <hr className="flex-grow border-gray-300"></hr>
                    <span className="px-4 ">or</span>
                    <hr className="flex-grow border-gray-300"></hr>
                </div>
                <SocialLogin></SocialLogin>
                <div className="mt-4 text-center">
                    <p>Already Have an account ? <span className="hover:text-teal-700 duration-200 text-teal-500 text-lg font-semibold"><Link href={'/login'}>Login</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;