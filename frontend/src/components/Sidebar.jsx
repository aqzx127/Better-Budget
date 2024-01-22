import { useState } from 'react';
//import { Group, Code } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import classes from '../css-modules/NavbarSimple.module.css';

const data = [
  { link: '', label: 'Dashboard', icon: IconBellRinging },
  { link: '', label: 'Transactions', icon: IconReceipt2 },
  { link: '', label: 'BudgetBuddy (AI Assistant)', icon: IconFingerprint },
  { link: '', label: 'My Goals', icon: IconKey },
  { link: '', label: 'Reports', icon: IconKey },
  { link: '', label: 'My Profile', icon: IconFingerprint },
  { link: '', label: 'Settings', icon: IconSettings },
];

function Navbar() {
  const [active, setActive] = useState('Dashboard');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;