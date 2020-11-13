/* eslint-disable no-console */
/* eslint-disable require-atomic-updates */
import mongoose from 'mongoose';

type Connection = {
  isConnected?: number;
};

const connection: Connection = {};

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    console.log('connection already exists');
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log('new connection created');
}

export default dbConnect;
