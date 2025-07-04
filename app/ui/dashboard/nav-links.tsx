'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Proyectos',
    href: '/dashboard/proyectos',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Asistente', href: '/dashboard/asistant', icon: UserGroupIcon },
];


export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className='flex flex-col h-1/3 justify-between'>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[60px] rounded-md 0  text-sm font-medium before:p-2 before:h-[48px] before:rounded-l-lg before:mr-4 hover:bg-slate-100 justify-start hover:text-violet-600 md:flex-none md:px-0',
              {
                'bg-slate-100 text-violet-600 before:bg-violet-600 before:h-full shadow': pathname === link.href,
              },
            )}
          >
            <div className='flex items-center gap-2  justify-center '>
                <LinkIcon className="w-6" />
                <p className="block w-10">{link.name}</p>
            </div>
          </Link>
        );
      })}
      {/* Capítulos dropdown */}
    </div>
  );
}
