// api.js

//--------------------------------------------TESTING API UTILS---------------------------------------------------------------------------------------

export const testBackend = () => {
  fetch('http://localhost:3001/api/test')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};

export const testAuth = async (accessToken) => {
  try {
    const response = await fetch('http://localhost:3001/api/authorized', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

//----------------------------------------------USER DATA API UTILS---------------------------------------------------------------------------------

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

export const updateUserProfile = async (userId, userBio, userRegion) => {
  try {
    const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bio: userBio,
        region: userRegion,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user profile: ${response.statusText}`);
    }
    
    console.log('User profile updated successfully');
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
};

//--------------------PLAID API UTILS----------------------------------------------------------------------------------------------

export const createLinkToken = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/plaid/create_link_token`, {
      method: 'POST',
    });
    const data = await response.json();
    return data.link_token;
  } catch (error) {
    throw new Error("Error fetching link token: " + error.message);
  }
};

export const exchangePublicToken = async (publicToken, accessToken) => {
  try {
    const response = await fetch("http://localhost:3001/api/plaid/exchange_public_token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ public_token: publicToken })
    });
    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    throw new Error("Error exchanging public token: " + error.message);
  }
};

export const plaidAuth = async (accessToken) => {
  try {
    const response = await fetch("http://localhost:3001/api/plaid/plaidAuth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ accessToken }) // Pass accessToken here
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error with Plaid Auth: " + error.message);
  }
};

//--------------Transaction API Calls-----------------------------------------------------------------------------

export const fetchUserTransactions = async (token) => {
  try {
    const response = await fetch("http://localhost:3001/api/transactions/view", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error fetching User Transactions: " + error.message)
  }
};

export const createUserTransaction = async (token, transactionData) => {
  try {
    const response = await fetch("http://localhost:3001/api/transactions/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(transactionData)
    });
    console.log(transactionData);
    console.log(token);
    const data = await response.json();
    console.log(data);
    return data; // Optionally, you can return the response data if needed
  } catch (error) {
    throw new Error("Error creating User Transaction: " + error.message);
  }
};

export const editUserTransaction = async (token, transactionId, editedTransaction) => {
  try {
    const response = await fetch(`http://localhost:3001/api/transactions/update/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editedTransaction)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error updating User Transaction: " + error.message);
  }
};

export const deleteUserTransaction = async (token, transactionId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/transactions/delete/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error deleting User Transaction: ", error.message);
  }
}
