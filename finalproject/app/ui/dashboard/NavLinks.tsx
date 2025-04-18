'use client';

import Link from 'next/link';

import clsx from 'clsx'



const links = [
    {name: 'Home',href:'/'},
    {name: 'About Us', href:'/dashboard/aboutus'},
    {name: 'Long in', href:'/dashboard/login'}];



export default function NavLinks() {

    return (
        <>
        {links.map((link) =>{
            return(
                <Link 
                key={link.name} href={link.href} className={clsx('nav-link')}>
                    <p className='hidden md:block'>{link.name}</p>
                </Link>   
            )
        })}

        </>
    )
}