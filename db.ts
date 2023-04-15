import { MongoClient } from 'mongodb';

const uri =
  'mongodb+srv://filipbrady:<password>@cluster0.oke5ytv.mongodb.net/test';
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('<database-name>');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
