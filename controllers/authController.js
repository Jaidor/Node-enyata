const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;
const secrete = 'enyataapp';
const response = require('../module/response');
const validateRequest = require('../module/validateRequest');
const loginTokenModel = require('./../models/loginTokenModel');

exports.register = (req, res) => {
    try {
        let validatedRequest = validateRequest(req, res);
        if (validatedRequest) {
            return validatedRequest;
        }
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        let email = req.body.email;
        let dateOfBirth = req.body.dateOfBirth;
        let gender = req.body.gender;
        let password = req.body.password;

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return response.failed(
                    res,
                    201,
                    'Error creating user ' + err,
                    false,
                );
            }
            userModel.create(
                {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    dateOfBirth: new Date(dateOfBirth),
                    gender: gender,
                    password: hash,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
                function(err, result) {
                    if (err) {
                        return response.failed(
                            res,
                            201,
                            'Error creating user ' + err,
                            false,
                        );
                    }
                    return response.success(
                        res,
                        'User created successfully',
                        false,
                    );
                },
            );
        });
    } catch (error) {
        return response.failed(res, 202, error.stack, false);
    }
};

exports.login = (req, res) => {
    try {
        let validatedRequest = validateRequest(req, res);
        if (validatedRequest) {
            return validatedRequest;
        }

        let username = req.body.username;
        let password = req.body.password;

        userModel.findOne({ username: username }, function(error, result) {
            if (error) {
                return response.failed(res, 201, error, false);
            }
            if (result) {
                bcrypt.compare(password, result.password, function(
                    err,
                    hashed,
                ) {
                    if (err) {
                        return response.failed(res, 201, err, false);
                    }
                    if (hashed) {
                        let payload = {
                            username: result.username,
                            email: result.email,
                            gender: result.gender,
                        };
                        let token = jwt.sign(payload, secrete, {
                            expiresIn: 60 * 60,
                        });

                        loginTokenModel.create(
                            {
                                userId: result._id.toString(),
                                token: token,
                                createdAt: Date.now(),
                                updatedAt: Date.now(),
                            },
                            function(error, savedToken) {
                                if (error) {
                                    return response.failed(
                                        res,
                                        400,
                                        error.message,
                                        false,
                                    );
                                } else {
                                    return response.success(
                                        res,
                                        'Login successful',
                                        {
                                            token: savedToken,
                                        },
                                    );
                                }
                            },
                        );
                    } else {
                        return response.failed(
                            res,
                            201,
                            'Invalid username or password',
                            false,
                        );
                    }
                });
            } else {
                return response.failed(
                    res,
                    201,
                    'Invalid username or password',
                    false,
                );
            }
        });
    } catch (error) {
        return response.failed(res, 400, error.stack, false);
    }
};

exports.validateToken = (req, res) => {
    try {
        var decoded = jwt.verify(req.token, secrete);
        return response.success(res, 'User authenticated', decoded);
    } catch (err) {
        return response.failed(res, 400, 'Error authenticating user', false);
    }
};
