// Routing
const router = require("express").Router();

// Database
const pool = require("../db");

// JWT
const { gatherUserId } = require("../helpers/jwt");

router.get('/gather', async (req, res) => {
    try {
        // Gather user id
        const user_id = gatherUserId(req.cookies.jwt)

        // Gather user profile through user id
        const user = await pool.query('SELECT * from users WHERE user_id = $1',
            [user_id]
        )

        // Check user existance
        if (user.rows.length === 0) {
            return res.status(404).json('No valid user')
        }

        return res.json({
            fname: user.rows[0].user_fname,
            lname: user.rows[0].user_lname,
            email: user.rows[0].user_email,
            phoneNumber: user.rows[0].user_phonenumber
        })

    } catch (error) {
        console.error(error)
        res.status(500).json('Server Error')
    }
})

router.post('/update', async (req, res) => {
    try {
        // Gather user id
        const user_id = gatherUserId(req.cookies.jwt)

        // Gather user profile through user id
        const user = await pool.query('SELECT * from users WHERE user_id = $1',
            [user_id]
        )

        // Check user existance
        if (user.rows.length === 0) {
            return res.status(404).json('No valid user')
        }

        console.log(req.body)
    } catch (error) {
        console.error(error)
        res.status(500).json('Server Error')
    }
})

module.exports = router;
