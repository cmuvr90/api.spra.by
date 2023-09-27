import mongoose from 'mongoose';

const connection = {isConnected: 0};

async function connect() {
  if (connection.isConnected) return;

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('CONNECTED DB');
      return;
    }
    await mongoose.disconnect();
  }

  if (process.env.MONGO_URL) {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log('FIRST CONNECT TO DB');
    connection.isConnected = db.connections[0].readyState;
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      // @ts-ignore
      connection.isConnected = false;
    }
  }
}

const db = {connect, disconnect};

export default db;