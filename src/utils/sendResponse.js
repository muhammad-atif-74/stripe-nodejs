module.exports = (res, status, success, message, data = {}) => {
    return res.status(status).json({ success, message, data });
};
