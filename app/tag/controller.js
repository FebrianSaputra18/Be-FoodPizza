const Tags = require("./model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = new Tags(payload);
    console.log("sudah masuk payload tag", tag);
    await tag.save();
    return res.status(200).send(tag);
  } catch (error) {
    if ((error && error.code === 404, "Validation error")) {
      return res.status(400).send({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    let tag = await Tags.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    res.json(tag);
  } catch (error) {
    if ((error && error.code === 404, "Validation error")) {
      res.status(400).send({
        error: error.message,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    let tag = await Tags.findByIdAndDelete(req.params.id);
    res.status(200).send(tag);
  } catch (error) {
    if ((error && error.code === 404, "Validation error")) {
      res.status(400).send({
        error: error.message,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const data = await Tags.find();
    return res.json({ message: "Data retrieved successfully", data });
  } catch (error) {
    if (error && error === "ValidationError") {
      return res.status(400).send({
        error: error.message,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

module.exports = {
  store,
  update,
  destroy,
  index,
};
