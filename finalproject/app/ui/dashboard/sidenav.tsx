import Link from "next/link";
import Homelogo from "@/app/ui/invoices/home-logo";
import '@/app/ui/dashboard/sidenav.css'
import Search from "@/app/ui/invoices/search";
import { Suspense } from 'react';


export default function SideNav(){
    return(
        <div className="sidenav">
            <Link href="/">Home</Link>  
            <Link href="/dashboard/aboutus">About Us</Link>
            <div className="logo">
                <Homelogo/>
            </div>
            <Link href="/dashboard/login">Log In</Link>
            <div className="search">
                <Suspense fallback={<div>Searching...</div>}>
                    <Search placeholder="Search..." />
                </Suspense>
            </div>

        </div>
    )
}