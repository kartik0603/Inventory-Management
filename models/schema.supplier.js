const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      trim: true,
    },
    contactInfo: {
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'], 
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a Valid email '], 
      },
    },
    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// prevent supplier delete Which They have Inventory

supplierSchema.pre('findOneAndDelete', async function (next) {
  const supplierId = this.getQuery()._id;
  const Inventory = mongoose.model('Inventory');
  const linkedItems = await Inventory.findOne({ supplier: supplierId });

  if (linkedItems) {
    const error = new Error('Cannot delete supplier with linked inventory items.');
    error.statusCode = 400;
    return next(error);
  }
  next();
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;


