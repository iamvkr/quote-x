const quoteModal = require("../../modals/quote");
const userModal = require("../../modals/user");
const quoteCreate = async (req, res) => {
    const { content, background } = req.body;
    if (!content) {
        res.render("message",{message:"quote cannot be empty"});
        return false;
    }
    // else create a quote:
    let user = await userModal.findOne({ email: req.email });
    const quote = await quoteModal.create({
        user: user._id,
        content,
        background
    });
    // update user modal
    user.quotes.push(quote._id);
    await user.save();
    // console.log("susccess!");
    res.redirect("/dashboard")
    // res.json({message:"form submitted"})
}
module.exports = quoteCreate;