const passport = require('passport');

const requireJwtAuth = (req, res, next) => {
    return next();
};

module.exports = requireJwtAuth;
