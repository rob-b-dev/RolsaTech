import { jwtDecode } from "jwt-decode";

// Pass and decode jwt
function decodeJWT(jwt) {
    return jwtDecode(jwt);
}

export function isLoggedIn(jwt) {
    const decoded_jwt = decodeJWT(jwt)
    // Return bool value depending on private access level 
    return decoded_jwt.access_level === 'PRIVATE'
}