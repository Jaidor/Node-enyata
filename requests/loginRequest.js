const { check } = require('express-validator');

module.exports = [
    check('username', 'Invalid username')
        .exists()
        .bail()
        .not()
        .isEmpty(),
    check('password', 'Invalid password')
        .exists()
        .bail()
        .not()
        .isEmpty(),
];
