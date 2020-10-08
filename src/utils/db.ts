import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.set('debug', process.env.NODE_ENV === 'development');

class Connection {
  private mockServer: MongoMemoryServer;
  /**
   *
   * @param {number} retryTimeOut In case of a network error an other connection will be attempted after this many milliseconds.
   */
  public async open(retryTimeOut = 10000): Promise<void> {
    try {
      if (process.env.NODE_ENV === 'test') {
        this.mockServer = new MongoMemoryServer();
        const connectionString = await this.mockServer.getUri();
        await mongoose.connect(connectionString, mongooseConfig);
      } else {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string, mongooseConfig);
      }
      mongoose.connection.on('error', err => {
        console.log(err);
        // It wouldn't make sense for it to throw a network error in test env
        if (err.name === 'MongoNetworkError') {
          setTimeout(() => {
            mongoose.connect(process.env.MONGO_CONNECTION_STRING as string, mongooseConfig).catch(() => {});
          }, retryTimeOut);
        } else {
          throw err;
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      // This "one" line is actually the whole point of this class
      if (process.env.NODE_ENV === 'test') {
        await this.mockServer.stop();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

/* const connectToDB = async () => {
  if (process.env.NODE_ENV === 'test') return;
  const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string, );

  console.log(`MongoDB Connected: ${conn.connection.host}`);
}; */

export default new Connection();
