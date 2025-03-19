// Routing
const router = require("express").Router();

// Database
const pool = require("../db");

// Security
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// Validation
const { body, validationResult } = require("express-validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

// Function to validate and format phone numbers
const validatePhoneNumber = (parsedPhone) => {
    const phone = parsePhoneNumberFromString(parsedPhone.trim());
    if (!phone || !phone.isValid()) {
        return null;
    }
    return phone.formatInternational();
};


// Routes
router.post("/login", [
    // Validation block
    body("email").isEmail().withMessage("Invalid email"),
],
    async (req, res) => {
        try {
            // Handle validation errors
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const { email, password } = req.body;

            // Gather user profile through email
            const user = await pool.query('SELECT * from users WHERE user_email = $1',
                [email]
            )

            // Check user existance
            if (user.rows.length === 0) {
                return res.status(401).json('Email or Password incorrect')
            }

            // Check password validity
            const validPassword = await bcrypt.compare(password, user.rows[0]?.user_password);

            if (!validPassword) {
                return res.status(401).json('Email or Password incorrect')
            }

            // If user passes the checks provide a PRIVATE JWT through passsing a user id

            createJWT(res, user.rows[0]?.user_id) // Optional chaining prevents errors on undefined and null values

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    })

router.post("/register", [
    // Validation block
    body("fname")
        .trim()
        .matches(/^[A-Z][a-z]*$/)
        .withMessage("First name must start with a capital letter, contain only letters, and have no spaces."),
    body("lname")
        .trim()
        .matches(/^[A-Z][a-z]*$/)
        .withMessage("Last name must start with a capital letter, contain only letters, and have no spaces."),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must have at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must have at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must have at least one number")
        .matches(/[\W]/).withMessage("Password must have at least one special character"),
    body("phoneNumber")
        .trim()
        .matches(/^\+?\d+$/).withMessage("Phone number must contain only numerical values"),
],
    async (req, res) => {
        try {

            // Handle validation errors
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0] })
            }

            const { fname, lname, email, countryCode, phoneNumber, password } = req.body;

            // Validate phone number

            // Combine country code with phone number before validation
            const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

            const validNumber = validatePhoneNumber(fullPhoneNumber)

            if (!validNumber) {
                return res.status(400).json('Invalid phone number')
            }

            // Gather user profile through email
            const user = await pool.query('SELECT * from users WHERE user_email = $1',
                [email]
            )

            // Check user existance
            if (user.rows.length > 0) {
                return res.status(409).json("User already exists")
            }

            // Generate salt for differentiation on hash
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);

            // Hash password through salt
            const bcryptPassword = await bcrypt.hash(password, salt)

            // Insert values for new user into database 
            const newUser = await pool.query("INSERT INTO users (user_fname, user_lname, user_email, user_phonenumber, user_password) VALUES($1, $2, $3, $4, $5) RETURNING *",
                [fname, lname, email, validNumber, bcryptPassword])

            // If user passes the checks provide a PRIVATE JWT through passsing a user id

            createJWT(res, newUser.rows[0].user_id) // Optional chaining prevents errors on undefined and null values

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    })

router.post("/logout", async (req, res) => {
    try {
        // Provide PUBLIC JWT on logout by not passing the user id
        createJWT(res)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// Called on every route click, sending the JWT through JSON so it can be accessed and decoded in the frontend to gather the access level and update the authenticated state
router.get("/verify", async (req, res) => {
    try {
        return res.json({
            jwt: req.cookies.jwt
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// Function for creating a JWT, setting it as a cookie and sending it off through JSON
const createJWT = (res, user_id) => {
    const jwt = jwtGenerator(user_id) // Pass user id so a PRIVATE JWT is returned
    // Set JWT as a cookie so it is bound to every request
    res.cookie('jwt', jwt, {
        httpOnly: true,
        secure: false, // Set to true in prod
        sameSite: 'Strict',
        maxAge: 3600000
    })
    res.json({ jwt }) // JWT sent as object through JSON so properties are accessible in frontend
}

module.exports = router;

