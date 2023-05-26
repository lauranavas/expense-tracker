import React from 'react'
import { Outlet } from "react-router-dom";
import AppLogo from '../Header/AppLogo';
import UserGreeting from '../Header/UserGreeting';

const AppLayout = () => {
  return (
    <div className='container mx-auto px-4 py-3 min-h-screen flex flex-col justify-start items-stretch'>
      <header className='flex flex-col justify-center items-center'>
        <AppLogo />
        <UserGreeting />
      </header>
      <main className='flex flex-col flex-grow py-4'>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout