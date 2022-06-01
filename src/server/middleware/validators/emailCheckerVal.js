const User = require("../../models/user.model");

module.exports = async (req, res, next) => {
    // find existing email
    const existingEmail = await User.findOne({
        email: req.body.email,
    });

    // error handling
    if (existingEmail)
        return res.json({ success: false, error: ["Email already in use"] });
    next();
};
