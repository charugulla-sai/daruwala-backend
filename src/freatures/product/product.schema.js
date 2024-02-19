import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    min: 0,
  },
  imageUrl: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
