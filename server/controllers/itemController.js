const Item = require("../models/itemModel");
const {updateItems} = require("../services/updateTableService");
const getDuName = async (id) => {
  const du = await DispensingUnit.findAll({
    where: {rowGuid:id}
  })
  return du[0].institutionName
}
const getAllDuItems = async (req, res, next) => {
  const duName = await getDuName(req.params.duName);
  try {
    const items = await Item.findAll({
      where: {
        institution: duName,
      },
    });
    res.send({ model: items }); ///Because the emr expects to get the items from an object named model.
  } catch (err) {
    next(err);
  }
};

const getDuItem = async (req, res, next) => {
  const { itemId, duName } = req.params;
  try {
    const items = await Item.findAll({
      where: {
        institution: duName,
        itemUnit: itemId,
      },
    });
    res.send({ model: items }); ///Because the emr expects to get the items from an object named model.
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllDuItems,
  getDuItem,
  updateItems,
};
