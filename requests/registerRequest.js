const { check } = require('express-validator');

module.exports = [
    check('email', 'Invalid email provided')
        .exists()
        .bail()
        .not()
        .isEmpty()
        .isEmail(),
    check('firstname', 'Invalid firstname')
        .exists()
        .bail()
        .not()
        .isEmpty(),
    check('lastname', 'Invalid lastname')
        .exists()
        .bail()
        .not()
        .isEmpty(),
    check('username', 'Invalid username')
        .exists()
        .bail()
        .not()
        .isEmpty(),
    check('dateOfBirth', 'Invalid date of birth')
        .exists()
        .bail()
        .not()
        .isEmpty()
        .custom(val => {
            if (new Date(val).toString() === 'Invalid Date') {
                throw new Error('Date is invalid');
            }
            return true;
        }),
    check('gender', 'Invalid gender')
        .exists()
        .bail()
        .not()
        .isEmpty()
        .custom((val, { req }) => {
            if (['male', 'female'].indexOf(val) < 0) {
                throw new Error('Invalid gender selected');
            }
            return true;
        }),
    check('password', 'Invalid password')
        .exists()
        .bail()
        .not()
        .isEmpty(),
    check('repassword', 'Invalid confirm password')
        .exists()
        .bail()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password does not match');
            }
            return true;
        }),
];
