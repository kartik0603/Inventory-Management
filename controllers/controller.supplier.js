const Supplier = require("../models/schema.supplier.js");

// Create  supplier
const createSupplier = async (req, res) => {
    try {
      const { name, contactInfo, address } = req.body;
  
      const newSupplier = await Supplier.create({ name, contactInfo, address });
      res.status(201).json({ message: 'Supplier created successfully', data: newSupplier });
    } catch (error) {
      res.status(500).json({ message: `Error creating supplier: ${error.message}` });
    }
  };
  
  //  Get all suppliers
  const getAllSuppliers = async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.status(200).json({ data: suppliers });
    } catch (error) {
      res.status(500).json({ message: `Error fetching suppliers: ${error.message}` });
    }
  };
  
  // Get a supplier by ID
  const getSupplierById = async (req, res) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findById(id);
      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
      res.status(200).json({ data: supplier });
    } catch (error) {
      res.status(500).json({ message: `Error fetching supplier: ${error.message}` });
    }
  };
  
  //  Update 
  const updateSupplier = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedSupplier = await Supplier.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!updatedSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      res.status(200).json({ message: 'Supplier updated successfully', data: updatedSupplier });
    } catch (error) {
      res.status(500).json({ message: `Error updating supplier: ${error.message}` });
    }
  };
  
  //  Delete a supplier
  const deleteSupplier = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedSupplier = await Supplier.findByIdAndDelete(id);
      if (!deletedSupplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      res.status(200).json({ message: 'Supplier deleted successfully', data: deletedSupplier });
    } catch (error) {
      if (error.statusCode === 400) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: `Error deleting supplier: ${error.message}` });
      }
    }
  };
  
  // Search suppliers by name or contact 
  const searchSuppliers = async (req, res) => {
    try {
      const { query } = req.query; 
      const suppliers = await Supplier.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { 'contactInfo.phone': { $regex: query, $options: 'i' } },
          { 'contactInfo.email': { $regex: query, $options: 'i' } },
        ],
      });
  
      res.status(200).json({ data: suppliers });
    } catch (error) {
      res.status(500).json({ message: `Error searching suppliers: ${error.message}` });
    }
  };
  
  module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
  };