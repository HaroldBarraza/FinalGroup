import Link from 'next/link';
import Homelogo from '@/app/ui/invoices/home-logo';
import '@/app/ui/dashboard/sidenav.css';
import Search from '@/app/ui/invoices/search';
import { Suspense } from 'react';
import getServerSession from 'next-auth';
import { authConfig } from '@/app/lib/auth.config';

export default async function SideNav() {
  const session = await getServerSession(authConfig) as { user?: { name?: string } };
  const userName = session?.user?.name;

  return (
    <div className="sidenav">
      <Link href="/">Home</Link>
      <Link href="/dashboard/aboutus">About Us</Link>

      <div className="logo">
        <Homelogo />
      </div>

      {userName ? (
        <span className="user-name">👋 {userName}</span>
      ) : (
        <Link href="/dashboard/login">Log In</Link>
      )}
      <Link href="/dashboard/register">Register</Link>
      <div className="search">
        <Suspense fallback={<div>Searching...</div>}>
          <Search placeholder="Search..." />
        </Suspense>
      </div>
    </div>
  );
}
