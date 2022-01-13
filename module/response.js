exports.success = (res, message, body) => {
    return res
        .status(200)
        .json({ status: 'success', message: message, body: body });
};

exports.failed = (res, status, message, body) => {
    return res
        .status(status)
        .json({ status: 'failed', message: message, body: body });
};
