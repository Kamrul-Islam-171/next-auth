"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log("session = ", session);
  console.log("session = ", session.data?.user?.name);

  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen gap-10">
        
        <button><Link className="bg-teal-500 px-5 py-2 hover:bg-teal-700 text-lg" href={'/checkout'}>Checkout</Link></button>
        <button><Link className="bg-teal-500 px-5 py-2 hover:bg-teal-700 text-lg" href={'/login'}>Login</Link></button>
        <button><Link className="bg-teal-500 px-5 py-2 hover:bg-teal-700 text-lg" href={'/userDetails'}>User Details</Link></button>
        <div className="mt-10">
          {
            session.data ? <div>
              <p>{session.data?.user?.name}</p>
              <button className="bg-lime-400 px-5 p-2" onClick={() => signOut()}>Logout</button>
            </div> : <p>Login first</p>
          }
        </div>
      </div>

    </main>
  );
}
