const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const userAuthController = require('./../controllers/userAuthController');

// router.route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);

// router.route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser)

router.post('/signup', userAuthController.signUp);
router.post('/login', userAuthController.login);

module.exports = router;