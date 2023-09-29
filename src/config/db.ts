import mongoose from 'mongoose';

async function connectToDB(){
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      dbName: 'sayakaya'
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}; 

export default connectToDB; 
