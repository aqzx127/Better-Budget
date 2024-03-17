// User Controller (Main Business Logic)

const User = require('../models/userModel'); // Import Data Model

// Function to handle creating a new user
exports.createUser = (req, res) => {
    const { userId, email, name, bio, region, additionalInfo } = req.body;
    User.create({ userId, email, name, bio, region, additionalInfo })
        .then(user => res.json(user))
        .catch(error => res.status(400).json({ error: error.message }));
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found'});
        }

        const userData = {
            name: user.name,
            email: user.email,
            region: user.region,
            bio: user.bio,
            additionalInfo: user.additionalInfo, 
            income: user.monthlyIncome,
            savingGoal: user.monthlySavingsGoal
        };

        res.json(userData);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    console.log(req.body);
    const { bio, region, monthlyIncome, monthlySavingsGoal } = req.body;
    try {
        const user = await User.findOne({ where: { userId } });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Update user data
        user.bio = bio;
        user.region = region;
        user.monthlyIncome = monthlyIncome;
        user.monthlySavingsGoal = monthlySavingsGoal;
        
        // Save changes to the database
        await user.save();
    
        res.json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add other controller functions as needed

// exports.checkProfileCompletion = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await User.findOne({ where: { userId } });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found'});
//         }

//         const isProfileComplete = user.additionalInfo;
//         res.json({ isProfileComplete });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error'})
//     }
// };



