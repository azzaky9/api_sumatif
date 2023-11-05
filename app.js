const express = require("express");
const cors = require("cors");
const app = express();
const middlewares = require("./src/api/middlewares");
const db = require("./src/db/db");
const {
  Feature,
  ListFeature,
  ProductWithFeature
} = require("./src/model/feature");
const logger = require("./src/lib/logger");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  logger.info(
    `Server hit with method: ${req.method.toUpperCase()} path ${req.path}  `
  );

  next();
});

app.use("/api", middlewares);

const PORT = process.env.PORT || 8080;

db.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server and mysql running at port: ${PORT}`);
    });
  })
  .catch((err) => logger.error(`message start: ${err.message}`));

// app.listen(PORT, () => {
//   console.info(`Server and mysql running at port: 8080`);
// });
