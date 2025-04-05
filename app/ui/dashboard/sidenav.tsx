"use client";

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SideNav({ children }: { children: React.ReactNode }) {
  const [first, setfirst] = useState(false)
  return (
    <div className="flex flex-col w-full h-max overflow-hidden min-h-max">
      <div className="flex w-full h-16 z-20 shadow bg-white fixed">
        <Link
            className="mb-2 flex h-full items-end justify-start bg-gradient-to-br from-violet-500 via-[#6f8cf6] to-[#51a5ff] p-4 w-64"
            href="/"
          >
            <div className="w-64 text-white md:w-40">
              GeTaPro
            </div>
        </Link>
      </div>
      <div className="h-16 w-full flex p-2"></div>
      <div className="flex w-full  h-max">
        <div className="flex flex-col px-3 fixed py-4 md:px-2 bg-slate-300 p-5  flex-none md:w-64 h-full">
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md md:block"></div>
            <form>
              <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-violet-950 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          </div>
        </div>
        <div className="md:w-[20rem]"></div>
        <div className="flex w-full h-max flex-grow scrollbar-hide   p-6 overflow-auto md:p-10 md:py-2">{children}</div>
      </div>
    </div>
  );
}
