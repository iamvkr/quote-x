const quoteModal = require("../modals/quote");

const home = async(req, res) => {
    const latestQuotes = await quoteModal.find({}).sort({date:-1}); //this fetch data from db in bottom to top format based on date field
    res.render("home",{latestQuotes});
}
module.exports = home;