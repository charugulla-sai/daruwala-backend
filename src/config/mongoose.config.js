import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/daruwala';

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connect to mongodb using mongoose.');
  } catch (err) {
    console.log(err);
  }
};
