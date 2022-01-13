const response = require('./response');
const { validationResult } = require('express-validator');
module.exports = (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return response.failed(res, 400, validationErrors.array(), false);
    }
    return false;
};
