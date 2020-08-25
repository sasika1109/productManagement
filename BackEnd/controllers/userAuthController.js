const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = 'powerful-scret';

exports.signUp = async (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            const user = new User();

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.address = req.body.address;
            user.password = hash;

            await user.save();

            const token = jwt.sign({ userID: user._id }, secret, {
                expiresIn: '90d'
            });

            user.password = undefined;
            res.status(201).json({
                message: 'success',
                user,
                token
            });
        });
    });

}

// user login controller
exports.login = async (req, res, next) => {

    try {
        // find the user by the provided email and assign it to a variable 
        const user = await User.findOne({
            email: req.body.email
        });

        // if email does not exist in the database terminate the auth process
        // ** returning this response in order to terminate the process and otherwise continue
        if (!user) {
            throw new Error('User with this email does not exist');
        }

        // if email exists compare password provided by the user with the passwhat that exists in the database 
        bcrypt.compare(req.body.password, user.password)
            .then(result => {
                // if passwords do not match terminate auth process
                // ** returning this response in order to terminate the process and otherwise continue
                if (!result) {
                    throw new Error('Invalid password');
                }

                // if passwords match assign a jwt token by providing userID, user's role and token expiration time
                const token = jwt.sign({ userID: user._id }, secret, {
                    expiresIn: '90d'
                });

                // set user's retrevied password to undifired before sending it with the response
                user.password = undefined;

                // send response with token, expiration, and user details (without password)
                res.status(200).json({
                    message: 'success',
                    token,
                    user
                });
            });
    } catch (error) {
        res.status(400).json({
            message: 'fail',
            error
        });
    }
}