const jwt = require("jsonwebtoken");

const isVerified = (req,res,next)=>{
    const { token } = req.cookies;
    if (!token) {
        res.redirect("/login")
    }
    else {
        // verify token:
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                res.cookie("token", "")
                // res.send({
                //     message: "Invalid token"
                // })
                // or redirect to login page
                res.redirect("/login")
            }
            const { email, userid } = decoded;
            req.email = email;
            req.userid = userid;
            next()
        });
    }
}

module.exports = {isVerified};