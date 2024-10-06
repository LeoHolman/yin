'use client';
import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';

// export default async function NavigationHeader() {
export default function NavigationHeader() {
  //   const session = await auth();
  const session = useSession();
  const { data, status } = session;
  return (
    <SessionProvider>
      <div>
        <nav>
          <Link href='/'>Home</Link>
          {status === 'authenticated' ? (
            <span>Logged in as: {data?.user?.name}</span>
          ) : (
            <Link href='/api/auth/signin'>Sign In</Link>
          )}
          <Link href='/api/auth/signout'>Sign Out</Link>
        </nav>
      </div>
    </SessionProvider>
  );
}
