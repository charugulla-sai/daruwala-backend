import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  size:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  reviews: {
    type: Array,
    ref: 'Review',
  },
});
