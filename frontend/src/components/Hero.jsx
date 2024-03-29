//import { useState } from 'react';
import { Container, Group, Button } from '@mantine/core';
import classes from '../css-modules/HeaderSimple.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import {
  IconPigMoney,
  IconToggleLeft,
  IconToggleRight,
  IconX,
  IconMenu2,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function Hero( { onToggleSidebar, isSidebarOpen } ) {

  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/');
  }

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <div className='flex items-center space-x-2 text-left'>
          {isSidebarOpen ? <IconX onClick={onToggleSidebar} className="cursor-pointer mr-10 ml-6" />
              : <IconMenu2 onClick={onToggleSidebar} className="cursor-pointer mr-10 ml-6" /> 
          }
         <button 
          onClick={redirectHome} 
          className="flex items-center space-x-2 text-left hover:text-blue-400 focus:outline-none"
        >
          <IconPigMoney className="cursor-pointer"/>
          <h1 className="font-bold text-lg cursor-pointer">Better Budget</h1>
        </button>
        </div>
        <Group className={classes.group}>
          {!isAuthenticated && (<Button className='align-right' onClick={loginWithRedirect}>Login</Button>)}
        </Group>
      </Container>
    </header>
  );
}

export default Hero;