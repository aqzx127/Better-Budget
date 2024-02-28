import { useEffect, useState } from 'react';
import { Paper, Image, Textarea, Button, Container, Divider } from '@mantine/core';
import {
  IconEdit,
  IconCheck,
} from '@tabler/icons-react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUserData, updateUserProfile } from '../utils/api'

function MyProfile() {
  const { user, isAuthenticated, isLoading, } = useAuth0();

  const [editMode, setEditMode] = useState(false);
  const [userBio, setUserBio] = useState('');
  const [userRegion, setUserRegion] = useState('');

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserProfile(user.sub, userBio, userRegion); // Use updateUserProfile function
      setEditMode(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      fetchUserData(user.sub, setUserBio, setUserRegion);
    }
  }, [isAuthenticated, isLoading, user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isAuthenticated && (
        <Container size="md" className="mt-8">
          <Paper shadow="sm" radius="md" p="lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {user.picture && (
                  <Image
                    src={user.picture}
                    alt="User Profile Picture"
                    width={100}
                    height={100}
                    style={{ borderRadius: '50%' }}
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  {editMode ? (
                    <Textarea
                      value={userRegion}
                      onChange={(event) => setUserRegion(event.target.value)}
                      placeholder="Edit your region here..."
                    />
                  ) : (
                    <p>Country: {userRegion}</p>
                  )}
                </div>
              </div>
              <Button
                variant="light"
                color="blue"
                onClick={editMode ? handleSaveClick : handleEditClick}
                icon={editMode ? <IconCheck /> : <IconEdit />}
              >
                {editMode ? 'Save' : 'Edit'}
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-decoration-line">Bio</h3>
              <Divider my="sm" />
              {editMode ? (
                <Textarea
                  value={userBio}
                  onChange={(event) => setUserBio(event.target.value)}
                  placeholder="Edit your bio here..."
                />
              ) : (
                <p>{userBio}</p>
              )}
            </div>
          </Paper>
        </Container>
      )}
      {!isAuthenticated && (
        <p>Please Login or Sign-up to view your profile</p>
      )
      }
    </>
  );
}

export default MyProfile;