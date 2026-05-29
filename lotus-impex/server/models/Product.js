const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sale_price: { type: Number },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  stock_status: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' },
  tags: [{ type: String }],
  images: [{ type: String }], // Array of image URLs/paths
  specifications: [{ 
    key: { type: String }, 
    value: { type: String } 
  }],
  is_featured: { type: Boolean, default: false },
  is_new_arrival: { type: Boolean, default: false },
  is_best_seller: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
