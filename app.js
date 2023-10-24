const express = require("express");
const cors = require("cors");
const app = express();
const middlewares = require("./src/api/middlewares");
const db = require("./src/db/db");
const Products = require("./src/model/products");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", middlewares);

const PORT = process.env.PORT;

db.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server and mysql running at port: ${PORT}`);
    });
  })
  .catch((err) => console.error(`message start: ${err}`));
