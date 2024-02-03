import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017/ecomDB';

let clientDB;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      console.log('Database connected successfully');
      clientDB = clientInstance.db();
    })
    .catch((err) => console.log(err));
};

export const getDB = () => {
  return clientDB;
};
