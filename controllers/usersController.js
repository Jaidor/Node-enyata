let forumCategoryModel = require('../models/userModel');
let validateRequest = require('../module/validateRequest');
let response = require('../module/response');

exports.updateUser = (req, res) => {
    try {
        const validatedRequest = validateRequest(req, res);
        if (validatedRequest) {
            return validatedRequest;
        }
        const userID = req.params.userID;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;

        userModel.updateOne(
            { _id: userID },
            { firstname: firstname, lasttname: lastname, updatedAt: Date.now() },
            function(error, result) {
                if (error) {
                    return response.failed(res, 400, error, false);
                } else {
                    return response.success(
                        res,
                        'User record updated successfully',
                        result,
                    );
                }
            },
        );
    } catch (error) {}
};

exports.deleteUser = (req, res) => {
    try {
        const userID = req.params.userID;

        userModel.deleteOne({ _id: userID }, function(
            error,
            result,
        ) {
            if (error) {
                return response.failed(res, 400, error, false);
            } else {
                return response.success(
                    res,
                    'User deleted successfully',
                    result,
                );
            }
        });
    } catch (error) {}
};

exports.fetchUsers = (req, res) => {
    try {
        userModel.find({}, function(error, result) {
            if (error) {
                return response.failed(res, 201, error.message, false);
            } else {
                return response.success(res, 'User record(s) fetched successfully', result);
            }
        });
    } catch (error) {
        return response.failed(res, 400, error.message, false);
    }
};
