// Test Controller

exports.test = (req, res) => {
    res.json({ message: 'Hello Stranger from the backend!' });
};

exports.authTest = (req, res) => {
    console.log(req.auth);

    const email = req.auth.payload['https://myapp.example.com/email']; // Access Custom Claims
    const userId = req.auth.payload['https://myapp.example.com/userId'];
  
    console.log(email);
    console.log(userId);
  
    const user = req.auth;
    res.json({ message: 'Hello Authorized User: ', user});
};
