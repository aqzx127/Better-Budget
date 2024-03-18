
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

exports.deleteUserGoal = (req, res) => {
    //const userId = req.auth.payload['https://myapp.example.com/userId'];
    const { id } = req.params; // Extract goal ID from URL parameters
    Goal.destroy({ where: { id } })
        .then(() => res.json({ message: 'Goal deleted successfully' }))
        .catch(error => res.status(400).json({ error: error.message }));
}

exports.updateGoalProgress = async (req, res) => {
    //const userId = req.params.userId;
    const { id } = req.params; // Extract goal ID from URL parameters
    const { progress } = req.body;
    try {
        const goal = await Goal.findOne({ where: { id }});

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        goal.progress = progress;

        await goal.save();
        res.json({ message: 'Goal progress updated successfully' });
    } catch (error) {
        console.error('Error updating goal progress:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

