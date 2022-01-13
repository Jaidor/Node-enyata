const { check } = require('express-validator');

module.exports = [
    check('userID', 'Invalid user ID')
        .exists()
        .bail()
        .not()
        .isEmpty(),
];
