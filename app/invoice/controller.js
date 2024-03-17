const Invoice = require("./model");

const show = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const invoice = await Invoice.findOne({ order: order_id });
    return res.json(invoice);
  } catch (err) {
    next(err);
  }
};

module.exports = { show };