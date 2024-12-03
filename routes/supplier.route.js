const express = require("express");
const supplierRouter = express.Router();

const  {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
  } = require("../controllers/controller.supplier.js");

const protect = require("../middleware/auth.middleware.js");
const roleCkeck = require("../middleware/roleCheck.middleware.js");

supplierRouter.use(protect);

supplierRouter.post("/create", roleCkeck(["Admin"]), createSupplier);
supplierRouter.get("/all", roleCkeck(["Admin", "Manager"]), getAllSuppliers);
supplierRouter.get("/by-id/:id", roleCkeck(["Admin", "Manager"]), getSupplierById);
supplierRouter.put("/update/:id", roleCkeck(["Admin"]), updateSupplier);
supplierRouter.delete("/delete/:id", roleCkeck(["Admin"]), deleteSupplier);
supplierRouter.get("/search", roleCkeck(["Admin", "Manager"]), searchSuppliers);

module.exports = supplierRouter;