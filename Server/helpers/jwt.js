const JWT = require('jsonwebtoken')

// Verify the JWT passed (public or priv) to check against secret
const VerifyJWT = (jwt) => {
    return JWT.verify(jwt, process.env.JWT_SECRET)
}

const gatherUserId = (jwt) => {
    const decoded_jwt = VerifyJWT(jwt)
    const { user_id } = decoded_jwt
    return user_id
}

module.exports = { VerifyJWT, gatherUserId }