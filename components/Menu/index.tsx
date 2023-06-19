'use client';
import {Button, Navbar, Typography} from "@material-tailwind/react";
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";



export default function Menu() {

    const {data: session} = useSession();

    const handleLogout = () => {
        signOut({callbackUrl: "/"});
    }


    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Dashboard
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/transactions" className="flex items-center">
                    Transactions
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/connections" className="flex items-center">
                    Connections
                </a>
            </Typography>
        </ul>
    );

    if(session?.user && session.user.name && session.user.image){
        const {name, image} = session.user;
        return (
            <>
                <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <Typography
                            as="a"
                            href="#"
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                           <Image src={"/dax.jpeg"} alt={"Dax Logo"} width={100} height={100}/>
                        </Typography>
                        <div className="ml-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-4">
                            <Image className={"rounded-3xl"} src={image} alt={"User Image"} width={50} height={50}/>
                            <span>{name}</span>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block bg-dax-400"
                                onClick={handleLogout}
                            >
                                <span>Sign out</span>
                            </Button>
                        </div>
                    </div>
                </Navbar>
            </>
        );
    }

}