import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://charugullasai:<password>@cluster0.pozjhoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      console.log('Database connected successfully');
      client = clientInstance
    })
    .catch((err) => console.log(err));
};

export const getDB = () => {
  return client.db();
};
