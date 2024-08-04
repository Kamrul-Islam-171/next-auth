import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Image from 'next/image';

const UserDetailspage = async() => {
    const session = await getServerSession(authOptions);
    const {name, email, image} = session.user;
    console.log(name, email)
    return (
        <div>
            <p>This is a server page. </p>
            <p>So to access session in client page we use UseSession hook. </p>
            <p>So to access session in server page we use getServersession(from module of ph). </p>
            <p>we need secret: process.env.NEXT_PUBLIC_SECRET </p>

            <div className='mt-20 p-10 bg-teal-500 text-2xl'>
                {/* <Image src={image} alt='user image' width={100} height={100}></Image> */}
                <p>{email}</p>
            </div>
        </div>
    );
};

export default UserDetailspage;