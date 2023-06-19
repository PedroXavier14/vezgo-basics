'use client';

import {useSession} from "next-auth/react";

export default async function Dashboard() {
    
    const {data: session} = useSession({
        required: true
    });
    
    return (
        <>
        </>
    )
}