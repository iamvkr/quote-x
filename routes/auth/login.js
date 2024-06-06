const userModal = require("../../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { //check if email and password are empty:
        res.render("message", { message: "Values cannot be empty" })
        return false;
    }
    // check if user exist:
    const user = await userModal.findOne({ email });
    // console.log(user);
    if (!user) {
        // if user doesnot exist:
        res.render("message", { message: "invalid credentials" });
        return false;
    }
    // elseif user exist:
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            // login suceess
            // now generate token and send as a cookie
            jwt.sign({ email, userid: user._id }, "secret", { expiresIn: '1h' }, function (err, token) {
                res.cookie("token", token);
                res.redirect("/dashboard")
            });
        } else {
            //    if password do not match:
            res.render("message", { message: "invalid credentials" });
        }
    });
}
module.exports = authLogin;