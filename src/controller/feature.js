const { Feature, ListFeature } = require("../model/feature");
const uniqid = require("uniqid");

const createFeature = async (req, res) => {
  try {
    const { featureName, featureList, featureKeys } = req.body;

    const ftId = uniqid("ft-");

    const bindFtId = featureList.map((ft) => {
      const subFt = uniqid();

      return {
        id: subFt,
        sub_feature_name: ft,
        ft_id: ftId,
      };
    });

    await Feature.create({
      ft_id: ftId,
      names: featureName,
      feature_type: featureKeys
    });

    await ListFeature.bulkCreate(bindFtId);

    return res
      .status(200)
      .json({ message: "complete to create", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "something went wrong on the server", status: "error" });
  }
};

const getAllFeature = async (req, res) => {
  try {
    const features = (await Feature.findAll()).map((ft) => ft.toJSON());

    const createListFeature = features.map(async (ft) => {
      const getAllFtListById = await ListFeature.findAll({
        where: {
          ft_id: ft.ft_id
        },
        attributes: ["sub_feature_name"]
      });

      const allListJson = getAllFtListById.map(
        (item) => item.toJSON().sub_feature_name
      );

      return {
        id: ft.ft_id,
        heading: ft.names,
        feature_keys: ft.feature_type,
        list_feature: allListJson
      };
    });

    const dataList = await Promise.all(createListFeature);

    res.status(200).json({ status: "success", data: dataList });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", message: "Something went wrong on the server" });
  }
};

module.exports = { createFeature, getAllFeature };
