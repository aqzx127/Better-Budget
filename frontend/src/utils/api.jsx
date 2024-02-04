// api.js

export const fetchUserData = async (userId, setUserBio, setUserRegion) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserBio(userData.bio || '');
        setUserRegion(userData.region || 'Not Set');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  