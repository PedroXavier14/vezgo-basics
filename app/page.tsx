'use client';

import Image from 'next/image'
import {useSession, signIn, signOut} from "next-auth/react"
import GoogleLogin from "@/components/GoogleLogin";
import {redirect} from "next/navigation";


export default function Home() {
    const { data: session, status } = useSession()

    if (status === "authenticated" && session?.user) {
        redirect("/connections");
    }

    return (
        <div className={"w-full flex flex-col items-center justify-center min-h-screen py-2"}>
            <Image
                src="/dax.jpeg"
                alt="DAX Logo"
                width={1000}
                height={500}
                className={"p-20"}
            />
            <div className={"flex flex-col items-center w-1/3 mt-10 p-10 shadow-md shadow-dax-400"}>
                <h1 className={"mt-10 mb-4 text-4xl font-bold"}>Sign In</h1>
                <GoogleLogin />
            </div>



        </div>
    )
}
