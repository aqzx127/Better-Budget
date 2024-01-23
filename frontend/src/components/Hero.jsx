//import { useState } from 'react';
import { Container, Group, Button } from '@mantine/core';
import classes from '../css-modules/HeaderSimple.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import {
  IconPigMoney,
} from '@tabler/icons-react';

function Hero() {

  const { loginWithRedirect } = useAuth0();

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group>
          <IconPigMoney />
          <h1 className='font-bold text-lg'>Better Budget</h1>
        </Group>
        <Group>
          <Button onClick={loginWithRedirect}>Login</Button>
        </Group>
      </Container>
    </header>
  );
}

export default Hero;