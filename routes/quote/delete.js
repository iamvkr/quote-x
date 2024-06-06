const quoteModal = require("../../modals/quote");
const userModal = require("../../modals/user");

function findIndexByValue(data, key, value) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][key] == value) {
            return i;
        }
    }
    return -1;
}

const quoteCreate = async (req, res) => {
    const { quoteId } = req.params;
    let user = await userModal.findOne({ email: req.email }).populate("quotes");
    const index = findIndexByValue(user.quotes, "_id", quoteId);
    const deletedQuote = await quoteModal.findOneAndDelete({_id:quoteId});
    // update the user quotes field:
    user.quotes.splice(index,1);
    await user.save()

    // res.json({ message: index, deletedquote:deletedQuote });
    res.redirect("/dashboard");
}
module.exports = quoteCreate;