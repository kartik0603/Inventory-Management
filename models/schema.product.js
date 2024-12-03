const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Inventory item name is required'], 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'], 
    min: [0, 'Quantity cannot be negative'] 
  },
  lowStock: { 
    type: Number, 
    default: 10, 
    min: [0, 'Low stock threshold cannot be negative'] 
  },
  supplier: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Supplier', 
    required: [true, 'Supplier is required'] 
  },
  isLowStock: { 
    type: Boolean, 
    default: false, 
    index: true 
  },
}, { 
  timestamps: true 
});


inventorySchema.pre('save', function (next) {
  this.isLowStock = this.quantity < this.lowStock;
  next();
});


inventorySchema.statics.getLowStockItems = async function () {
  return this.find({ isLowStock: true });
};

// Compound index for optimized supplier-based queries
inventorySchema.index({ supplier: 1, isLowStock: 1 });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;



