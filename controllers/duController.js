const DispensingUnit = require("../models/duModel");
const {updateDu} = require("../services/updateTableService");

const getAllDu = async (req, res, next) => {
  try {
    const du = await DispensingUnit.findAll();
    res.send({ model: du }); ///Because the emr expects to get du items from the model object, we need to send the model object to the client.
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllDu,
  updateDu,
};
