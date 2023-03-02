const jwt = require('jsonwebtoken');
const { REFRESH_TOKEN_KEY } = process.env;

exports.updateToken = async function (req, res) {
    try {
        if (req.token) {

            const refreshedToken = jwt.sign({
                userId: req._id,
                email: req.email
            }, REFRESH_TOKEN_KEY, {
                expiresIn: "15ms"
            });
            return refreshedToken;

        } else {
            return res.status(404).json({
                message: `User has no token`
            })
        }
    } catch (error) {
        console.log(`Something went wrong! Erorr: ${error}`);
    }
}