const userModal = require("../modals/user");


const dashboard = async (req, res) => {
    // get user quotes by populating quote ids:
    let user = await userModal.findOne({email:req.email}).populate("quotes");
    res.render("dashboard",{email:req.email, user});
}
module.exports = dashboard;