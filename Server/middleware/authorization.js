const { VerifyJWT } = require('../helpers/jwt')
const jwtGenerator = require("../utils/jwtGenerator");

module.exports = async (req, res, next) => {
    try {
        // Verify JWT to check for tampering
        VerifyJWT(req.cookies.jwt)
    } catch (error) {
        // Generate PUBLIC JWT if tampered with
        const jwt = jwtGenerator();
        // Set generated JWT as a cookie before responding, ensuring the client provides it to the backend in future requests
        // Cookie needs to be set here so it is available for backend logic on the next request
        res.cookie('jwt', jwt, {
            httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 3600000,
        });
        return res.status(403).json({
            message: "Invalid jwt, public access granted",
            code: "INVALID_REQUEST",
            jwt,
        });
    }

    next()
}