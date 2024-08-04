"use client"

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    const router = useRouter();
    const session = useSession();
    const serarchParam = useSearchParams();
    const path = serarchParam.get('redirect');
    const handleLogin = async(provider) => {
        const res = await signIn(provider, {
            redirect:true,
            callbackUrl:path ? path : '/'
        })
    }
    if(session.status == 'authenticated') router.push('/')
    return (
        <div>
            <div className="mt-2 flex justify-center gap-4">
                <button onClick={() => handleLogin('google')} className="bg-teal-500 p-2 duration-200 hover:bg-teal-700 text-2xl rounded-full shadow-md shadow-gray-500"><FaGoogle /></button>
                <button onClick={() => handleLogin('github')} className="bg-teal-500 p-2 duration-200 hover:bg-teal-700 text-2xl rounded-full shadow-md shadow-gray-500"><FaGithub /></button>
            </div>
        </div>
    );
};

export default SocialLogin;