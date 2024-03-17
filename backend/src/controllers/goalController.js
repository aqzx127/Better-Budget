
const Goal = require('../models/goalModel'); 

exports.createUserGoal = (req, res) => {
    const { title, amount } = req.body;
    console.log(req.auth);
    const userId = req.auth.payload['https://myapp.example.com/userId']; // Retrieve userId from req.user
    console.log(userId);
    Goal.create({ userId, title, amount })
        .then(goal => res.json(goal))
        .catch(error => res.status(400).json({ error: error.message }));
}

exports.fetchUserGoals = (req, res) => {
    const userId = req.auth.payload['https://myapp.example.com/userId'];
    Goal.findAll({ where: { userId } })
        .then(goal => res.json(goal))
        .catch(error => res.status(400).json({ error: error.message }));
}
