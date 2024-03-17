import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from '../css-modules/UserButton.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

export function UserButton() {
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const handleNavigate = () => {
        navigate('/profile');
    };

    // Check if user is authenticated but there is no user object (session expired or token revoked)
    if (!user) {
        return (
            <div>
                <Text size="sm">Session expired. Please log in again.</Text>
                <UnstyledButton onClick={loginWithRedirect}>Log In</UnstyledButton>
            </div>
        );
    }

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