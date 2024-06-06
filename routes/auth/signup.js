const userModal = require("../../modals/user");
const bcrypt = require("bcrypt");
const authSignup = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.render("message",{message:"Values cannot be empty"});
        return false;
    }
    // check if user exist:
    const user = await userModal.findOne({ email });
    if (user) {
        // res.status(500).json({ message: "user already exist" });
        res.render("message",{ message: "Something went wrong" });
    }else{
        // if unique user:
        // hash the password
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                // Store hash in your password DB.
                await userModal.create({
                    email,
                    password: hash,
                })
                // res.json({ message: "new user signup success, login to your account" })
                res.render("message",{message:"signup success, login to your account"})
            });
        });
    }
}
module.exports = authSignup;