import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from '../css-modules/UserButton.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../context/authContext';

export function UserButton() {

    //const { getToken } = useAuth();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate(); // Initialize useNavigate hook

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    const handleNavigate = () => {
        navigate('/profile'); // Function to navigate to the profile page
    };

  return (
    isAuthenticated && (
    <UnstyledButton className={classes.user} onClick={handleNavigate}>
      <Group>
        <Avatar
          src={user.picture}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.name}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
    )
  );
}