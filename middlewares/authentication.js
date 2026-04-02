const { validateToken } = require('../services/authentication'); // Import your token validation function

function authenticationMiddleware(cookieName) {
    return function (req, res, next) {
        const token = req.cookies[cookieName];

        if (!token) return next();

        try {
            const userPayload = validateToken(token);
            req.user = userPayload;
            return next();
        } catch (err) {
            return next();
        }
    };
}

module.exports = authenticationMiddleware;