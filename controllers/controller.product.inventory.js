const Inventory = require("../models/schema.product.js");
const Supplier = require("../models/schema.supplier.js");
const fs = require("fs");
const csv = require("fast-csv");

// / Create a new stock entry
const createStockEntry = async (req, res) => {
  try {
    const { name, description, quantity, lowStock, supplier } = req.body;

    // Validate supplier ID
    const existingSupplier = await Supplier.findById(supplier);
    if (!existingSupplier) {
      return res.status(400).json({ message: 'Invalid supplier ID provided.' });
    }

    const newItem = await Inventory.create({ name, description, quantity, lowStock, supplier });
    res.status(201).json({ message: 'Stock entry created successfully', data: newItem });
  } catch (error) {
    res.status(500).json({ message: `Error creating stock entry: ${error.message}` });
  }
};

//  Update stock entry by ID
const updateStockEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier, ...updates } = req.body;

    // Validate supplier if updating
    if (supplier) {
      const existingSupplier = await Supplier.findById(supplier);
      if (!existingSupplier) {
        return res.status(400).json({ message: 'Invalid supplier ID provided.' });
      }
      updates.supplier = supplier;
    }

    const updatedItem = await Inventory.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Stock entry not found.' });
    }

    res.status(200).json({ message: 'Stock entry updated successfully', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: `Error updating stock entry: ${error.message}` });
  }
};

//  Delete a product by Id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Stock entry not found.' });
    }
    res.status(200).json({ message: 'Stock entry deleted successfully', data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: `Error deleting stock entry: ${error.message}` });
  }
};

//Bulk import products 
const importProductsFromCSV = async (req, res) => {
  try {
    const fileRows = [];
    fs.createReadStream(req.file.path)
      .pipe(csv.parse({ headers: true }))
      .on('data', async (row) => {
        const supplierExists = await Supplier.exists({ _id: row.supplier });
        if (!supplierExists) {
          throw new Error(`Invalid supplier ID in row: ${JSON.stringify(row)}`);
        }
        fileRows.push(row);
      })
      .on('end', async () => {
        await Inventory.insertMany(fileRows);
        fs.unlinkSync(req.file.path); // Delete the uploaded file
        res.status(201).json({ message: 'Products imported successfully', data: fileRows });
      });
  } catch (error) {
    res.status(500).json({ message: `Error importing CSV: ${error.message}` });
  }
};

//product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Inventory.findById(id).populate('supplier', 'name contactInfo');
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: `Error fetching product: ${error.message}` });
  }
};

//  all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Inventory.find().populate('supplier', 'name contactInfo');
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: `Error fetching products: ${error.message}` });
  }
};

//  low-stock products
const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Inventory.find({ isLowStock: true })
      .select('name quantity _id')
      .populate('supplier', 'name');
    res.status(200).json({ data: lowStockProducts });
  } catch (error) {
    res.status(500).json({ message: `Error fetching low-stock products: ${error.message}` });
  }
};

module.exports = {
  createStockEntry,
  updateStockEntry,
  deleteProduct,
  importProductsFromCSV,
  getProductById,
  getAllProducts,
  getLowStockProducts,
};