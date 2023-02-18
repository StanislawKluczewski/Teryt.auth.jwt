const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env;
const auth = require('../auth/update.token');

exports.register = async function (req, res) {

    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser) {
            return res.status(409).send(`User of email: ${req.body.email} already exists. Please login.`);
        }

        const { login, email, password } = req.body;
        if (!(login && email && password)) {
            res.status(400).send("All inputs is required");
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            login: login,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign({
            userId: newUser._id,
            email: newUser.email
        }, TOKEN_KEY, {
            expiresIn: "10ms"
        });

        newUser.token = token;
        await newUser.save();

        return res.status(201).json({
            message: 'User has been created',
            user: newUser
        })

    } catch (error) {
        console.log(`Something went wrong! Erorr: ${error}`);
    }
}

exports.login = async function (req, res) {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("All inputs is required");
    }

    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser == null) {
        return res.status(409).send(`User of email: ${req.body.email} not exsists`);
    }

    if (await bcrypt.compare(password, foundUser.password)) {

        let refreshedToken = '';
        await auth.updateToken(foundUser).then(result => {
            refreshedToken = result;
        });
        await User.findByIdAndUpdate(foundUser._id, {
            login: foundUser.login,
            email: foundUser.email,
            password: foundUser.password,
            token: refreshedToken
        })

        return res.status(200).json({
            message: 'User has been logged in',
            user: foundUser
        })

    } else {
        res.status(400).send("Invalid Credentials");
    }





}

