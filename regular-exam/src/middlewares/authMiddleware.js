const jwt = require('../lib/jwt');

const { TOKEN_KEY, SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {

    const token = req.cookies[TOKEN_KEY];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
        } catch (error) {
            res.clearCookie(TOKEN_KEY);

            res.redirect('/users/login');
        }
    } else {
        next();
    }

}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }

    next();
};