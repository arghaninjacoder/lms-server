require('dotenv').config();

import { app } from "./app";
import connectDb from "./utils/db";

// create server
app.listen(process.env.PORT, () => {
  console.log("server listening on port " + process.env.PORT)
  connectDb();
})