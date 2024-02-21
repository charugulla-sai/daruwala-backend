import mongoose from 'mongoose';

export const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});
