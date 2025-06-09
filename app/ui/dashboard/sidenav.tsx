"use client";

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { useUser } from '@/app/hooks/useLogged';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';


export default function SideNav({ children }: { children: React.ReactNode }) {
  const { user, logout } = useUser();
  console.log(user)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex relative flex-col w-full min-h-screen">
      
      {/* Top bar */}
      <div className="flex w-full justify-between h-16 z-20 shadow bg bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-[#5e412f] fixed">
        <Link
            className="mb-2 flex h-full items-end justify-start bg-gradient-to-br from-violet-500 via-[#6f8cf6] to-[#51a5ff] p-4 w-52"
            href="/"
          >
            <div className="w-64 text-white md:w-40">
              GeTaPro
            </div>
        </Link>
        <button
            className="md:hidden mr-4 text-violet-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

      {/* Espaciador del topbar */}
      <div className="h-16" />
      {/* {`bg-slate-300 absolute top-16 left-0 z-10 h-[calc(100vh-4rem)] w-[19.5rem] p-5 transition-transform duration-300 ease-in-out md:translate-x-0 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:static md:block`} */}
          <div
            className={clsx(
              'flex fixed bg-[#ebe4d9]  h-[91dvh] z-20 top-16 p-2 w-52 transition-transform duration-300 ease-in-out md:translate-x-0 md:block',
              {
                'translate-x-0': menuOpen,
                '-translate-x-full': !menuOpen,
              }
            )}
          >
          <div className="flex flex-col h-full justify-between space-y-4">
            <NavLinks />
            <button
              onClick={logout}
              className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-violet-400 hover:text-white"
            >
        {user && (
          <Image
            src={user.photoId}
            alt={user.name || 'Usuario'}
            className="rounded-full w-10 h-10"
            width={100}
            height={100}
          />
        )}
        <span>Cerrar sesión</span>
      </button>
          </div>
        </div>

      <div className="flex w-full">
        <div className="hidden md:block w-72" />

        {/* Main content */}
        <main className="flex flex-grow w-full h-max p-4 md:p-10 overflow-y-auto  ">
          {children}
        </main>
      </div>
    </div>
  );
}