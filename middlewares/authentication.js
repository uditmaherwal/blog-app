const { validateToken } = require('../services/authentication'); // Import your token validation function

function authenticationMiddleware(cookieName) {
    return function (req, res, next) {
        const token = req.cookies[cookieName];

        if (!token) return res.redirect('/user/login');

        try {
            req.user = validateToken(token);
            return next();
        } catch (err) {
            return res.redirect('/user/login');
        }
    };
}

module.exports = authenticationMiddleware;