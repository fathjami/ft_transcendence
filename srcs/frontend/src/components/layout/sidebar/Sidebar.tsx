'use client';

import Link from 'next/link';
import {
  defaultSidebarItems,
  DefaultSidebarItemsProps,
} from './defaultSidebarIrems';
import { TbLogout2 } from 'react-icons/tb';
import Logo from '../../logos/ PongTimeLogo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const route = useRouter();
  const [clicked, setClicked] = useState<string>('');

  return (
    <div className="text-white justify-between list-none flex flex-col bg-[#25244E] h-full w-[5rem] mt-0 bottom-0 py-4">
      <div className="  self-center ">
        <Logo />
      </div>

      <div className="flex flex-col justify-center text-[#7171b4] gap-4">
        {defaultSidebarItems.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className={`flex 
                        flex-col 
                        items-center 
                        gap-1 
                        justify-center 
                        self-center 
                        h-16 w-16 
                        rounded-lg 
                        hover:bg-[#6767a3]/20
                        hover:text-[#8787d5]
                        ${clicked === item.label && 'bg-[#6767a3]/20 text-[#8787d5]'}
                        p-2
                        `}
              onClick={() => setClicked(item.label)}
            >
              {item.icon}
              <span className="text-[0.66rem] ">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => route.push(process.env.BACKEND + '/api/auth/logout')}
        className={`bottom-0 
        self-center 
        flex 
        flex-col 
        justify-center 
        h-16 w-16
        p-2
        gap-1 
        text-red-700 
        rounded-lg 
        hover:bg-[#6767a3]/20 
        hover:text-red-600 
        cursor-pointer`}
      >
        <TbLogout2
          className="self-center"
          style={{ width: '1.9rem', height: '2rem' }}
        />
        <span className="text-xs self-center">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
