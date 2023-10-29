const e = require("express");
const Products = require("../../model/products");
const uniqueId = require("uniqid");
const {
  ProductWithFeature,
  Feature,
  ListFeature
} = require("../../model/feature");

const createProduct = async (req, res) => {
  try {
    const { dataProduct, listFeature } = req.body;

    const validGroupList = [
      "Ruang Belajar",
      "Brain Academy",
      "Onsite Learning"
    ];
    const validJenjangList = ["sd", "smp", "sma", "utbk/snbt"];

    if (!validGroupList.includes(dataProduct.group)) {
      throw new Error(
        `Group With name ${dataProduct.group} not valid, check the docs for detail required`
      );
    }

    if (!validJenjangList.includes(dataProduct.jenjang)) {
      throw new Error(
        `Jenjang With name ${dataProduct.jenjang} not valid, check the docs for detail required`
      );
    }

    const createId = uniqueId("prd-");

    const createBulk = listFeature.map((lf, _) => {
      const generateId = uniqueId();

      return { pf_id: generateId, product_id: createId, ft_id: lf.id };
    });

    console.log("[MARKING:]", createBulk);

    await Products.create({
      id: createId,
      name: dataProduct.name,
      description: dataProduct.description,
      price: dataProduct.price,
      discount: dataProduct.discount ? dataProduct.discount : 0,
      kelas: dataProduct.kelas ? dataProduct.kelas : null,
      jenjang: dataProduct.jenjang,
      group: dataProduct.group,
      group_by_month: dataProduct.groupByMonth
    });

    await ProductWithFeature.bulkCreate(createBulk);

    res
      .status(200)
      .send({ message: "Product complete to create", status: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: error.message, status: "failed" });
  }
};
const formatToIdrCurrency = (priceNum) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2 // Optional: set the number of decimal places
  });

  return formatter.format(priceNum);
};

const createSchema = async (rawData) => {
  try {

    const calcBeforAndAfterPrice = (exactPrice, discount) => {
      const getDiscount = (discount / 100) * exactPrice;
      const decreasePrice = exactPrice - getDiscount;

      return {
        after_discount: formatToIdrCurrency(decreasePrice),
        before_discount: formatToIdrCurrency(exactPrice)
      };
    };

    const bindFeatureId = rawData.map(async (product) => {
      // convert to json
      const productJSON = product.toJSON();

      // get feature with the product id
      const featuresId = await ProductWithFeature.findAll({
        where: {
          product_id: productJSON.id
        },
        include: {
          model: Feature,
          attributes: ["names"]
        },
        attributes: ["ft_id"]
      });

      return {
        ...productJSON,
        feature_list: featuresId.map((ft) => {
          return { id: ft.ft_id, name: ft.feature.names };
        })
      };
    });

    const productsList = await Promise.all(bindFeatureId);

    const filledList = productsList.map(async (product) => {
      const findListFeature = product.feature_list.map(async (item, index) => {
        const feature = await ListFeature.findAll({
          where: {
            ft_id: item.id
          },
          attributes: ["sub_feature_name"]
        });

        const itemJSON = feature.map((ft) => {
          const jsonValue = ft.toJSON();

          return jsonValue;
        });

        return {
          heading: item.name,
          list_fitur: itemJSON.map((item) => item.sub_feature_name)
        };
      });

      const result = await Promise.all(findListFeature);

      return {
        ...product,
        fitur: result
      };
    });

    const afterFilledWithFt = await Promise.all(filledList);

    const createResponse = afterFilledWithFt.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description,
      fitur: product.fitur,
      discount: product.discount,
      group_by_month: product.group_by_month,
      price: calcBeforAndAfterPrice(product.price, product.discount)
    }));

    return createResponse;
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async (limitter) => {
  try {
    const products = await Products.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "discount",
        "jenjang",
        "kelas",
        "group",
        "group_by_month"
      ],
      limit: limitter ? limitter : undefined
    });

    const result = await createSchema(products);

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const q = req.query;

    const result = await getAllProduct();

    return res.status(200).send({ data: result, status: "success" });
  } catch (error) {
    return res.status(400).send({ message: error.message, status: "error" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const q = req.query;

    const { jenjang, kelas, group, long_period } = q;

    const matchKelas = kelas ? `kelas ${kelas.split("-")[0]}` : undefined;
    const getGroup = group === "rb" ? "Ruang Belajar" : "Brain Academy";

    const createWhereQuery = kelas
      ? {
          kelas: matchKelas,
          group_by_month: Number(long_period),
          jenjang: jenjang,
          group: getGroup,
          is_product_display: true
        }
      : {
          group_by_month: Number(long_period),
          jenjang: jenjang,
          group: getGroup,
          is_product_display: true
        };

    const productByQuery = await Products.findAll({
      where: createWhereQuery
    });

    const dummy = await createSchema(productByQuery);

    res.status(200).send({ status: "success", data: dummy });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      status: "failed",
      message: "Bad request occurred, all query must be required"
    });
  }
};

const getDiscoverHomepage = async (req, res) => {
  try {
    const products = await getAllProduct(5);

    return res.status(200).json({
      data: products,
      status: "success"
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Indicated bad request",
      status: "error"
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getDiscoverHomepage,
  searchProduct
};
