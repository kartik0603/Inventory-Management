const express = require("express");
const inverntoryRouter = express.Router();

const {
  createStockEntry,
  updateStockEntry,
  deleteProduct,
  importProductsFromCSV,
  getProductById,
  getAllProducts,
  getLowStockProducts,
} = require("../controllers/controller.product.inventory.js");

const protect = require("../middleware/auth.middleware.js");
const roleCkeck = require("../middleware/roleCheck.middleware.js");
const upload = require("../utils/uploader.js");

inverntoryRouter.use(protect);

inverntoryRouter.post("/create", roleCkeck(["Admin"]), createStockEntry);
inverntoryRouter.put("/update/:id", roleCkeck(["Admin"]), updateStockEntry);
inverntoryRouter.delete("/delete/:id", roleCkeck(["Admin"]), deleteProduct);

inverntoryRouter.get("/product/:id", roleCkeck(["Admin"]), getProductById);
inverntoryRouter.get("/all", roleCkeck(["Admin", "Manager"]), getAllProducts);
inverntoryRouter.get(
  "/low-stock",
  roleCkeck(["Admin", "Manager"]),
  getLowStockProducts
);

inverntoryRouter.post(
  "/import",
  roleCkeck(["Admin"]),
  upload.single("file"),
  importProductsFromCSV
);

module.exports = inverntoryRouter;
