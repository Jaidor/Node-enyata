const app = require('express');
const router = app.Router();

const registerRequest = require('../requests/registerRequest');
const loginRequest = require('../requests/loginRequest');
const updateUserRequest = require('../requests/updateUserRequest');

const authController = require('./../controllers/authController');
const usersController = require('./../controllers/usersController');


router.post('/register', registerRequest, authController.register);
router.post('/login', loginRequest, authController.login);
router.get('/users', usersController.fetchUsers);

router.patch(
    '/update-user/:userID',
    updateUserRequest,
    usersController.updateUser,
);
router.delete(
    '/delete-user/:userID',
    usersController.deleteUser,
);

module.exports = router;
