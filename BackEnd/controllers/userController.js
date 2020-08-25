const User = require('./../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Users could not be loaded'
        });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'User could not be found'
        });
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);

        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: {
                newUser
            }
        });

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'failed',
            message: 'User could not be created'
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                updatedUser: user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'User could not be updated'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'User could not be deleted'
        })
    }
}