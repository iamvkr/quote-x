const logout = (req,res)=>{
    res.cookie("token", "")
    res.redirect("/")
}

module.exports = logout;