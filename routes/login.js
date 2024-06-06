const login = (req, res) => {
    /* check for if user is already loggedin by checking user cookie token first: */
    const {token} = req.cookies;
    if (token) {
        /* token exist: then redirect to dashboard */
        res.redirect("/dashboard");
    }else{
        res.render("login");
    }
}
module.exports = login;