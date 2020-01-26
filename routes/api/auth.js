const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password', 
        'Password is required'
    ).exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password} = req.body;

    try {
        // check if the user exist
        let user = await User.findOne({ email }).where({status: true});

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User not found' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Password is invalid' }] });
        }

        // return jsonwebtoken

        const payload = {
            user: {
                id:user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtToken'),
            {expiresIn: 36000},
            (err, token) => {
                if (err, token) {
                    res.json({token});
                }
            }
            );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});

module.exports = router;