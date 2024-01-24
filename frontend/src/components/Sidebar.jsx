import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { Group, Code } from '@mantine/core';
import {
  IconHome,
  IconUserCircle,
  IconSettings,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconReport,
  IconTargetArrow,
  IconMessageChatbot,
} from '@tabler/icons-react';
import classes from '../css-modules/NavbarSimple.module.css';
import { UserButton } from './UserButton';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconHome },
  { link: '/transactions', label: 'Transactions', icon: IconReceipt2 },
  { link: '/assistant', label: 'Budget Buddy (AI-Assistant)', icon: IconMessageChatbot },
  { link: '/goals', label: 'My Goals', icon: IconTargetArrow },
  { link: '/reports', label: 'Reports', icon: IconReport },
  { link: '/profile', label: 'My Profile', icon: IconUserCircle },
  { link: '/settings', label: 'Settings', icon: IconSettings },
];

function Navbar() {
  const [active, setActive] = useState('');
  const { logout, } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = data.find(item => item.link === currentPath)?.label;
    setActive(activeItem || '');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    logout({ returnTo: window.location.origin });
  }

  const links = data.map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
      <UserButton />
      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => {
          event.preventDefault()
        }}>
          
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => {
          event.preventDefault()
          handleLogout();
        }}>
          <IconLogout className={classes.linkIcon} stroke={1.5}/>
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;