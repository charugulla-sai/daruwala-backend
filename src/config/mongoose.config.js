import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

const url = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.pozjhoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connect to mongodb using mongoose Atlas.');
  } catch (err) {
    console.log(err);
  }
};
