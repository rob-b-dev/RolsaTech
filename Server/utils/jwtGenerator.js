// JWT
const JWT = require("jsonwebtoken")
require("dotenv").config(); // Access environmental variables

const jwtGenerator = (user_id) => {

    // PUBLIC payload
    const payload = {
        access_level: 'PUBLIC'
    }

    // If user id is passed convert to PRIVATE access level and provide a user id in the payload
    if (user_id) {
        payload.access_level = 'PRIVATE'
        payload.user_id = user_id
    }

    // Sign JWT with payload and secret
    return JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
}

module.exports = jwtGenerator;
