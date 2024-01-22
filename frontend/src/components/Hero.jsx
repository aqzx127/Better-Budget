//import { useState } from 'react';
import { Container, Group, Button } from '@mantine/core';
import classes from '../css-modules/HeaderSimple.module.css';



function Hero() {
  

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
      <h1 className='font-bold'>Better Budget</h1>
        <Group>
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>
      </Container>
    </header>
  );
}

export default Hero;