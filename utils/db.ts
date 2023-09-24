import mongoose from "mongoose";

const dbUrl: string = process.env.DB_URI || ''

const connectDb = async () => {
  try {
    mongoose.connect(dbUrl).then((data: any) => console.log(`Database connected with ${data.connection.host}`)).catch(err => console.log(err))
  } catch (error: any) {
    console.log(error.message)
    setTimeout(connectDb, 5000)
  }
}

export default connectDb;