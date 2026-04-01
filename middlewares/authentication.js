const { validateToken } = require('../services/authentication'); // Import your token validation function

function authenticationMiddleware(cookieName) {
    return function (req, res, next) {
        const token = req.cookies[cookieName];
        if (!token) {
            return res.redirect('/login');
        }

        try {
            const userPayload = validateToken(token);
            req.user = userPayload;
        } catch (error) {

        }
        next();
    };
}

module.exports = authenticationMiddleware;