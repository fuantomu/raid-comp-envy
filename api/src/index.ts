import { config } from "dotenv";

config({ path: `.env` });
config({ path: `.env.${process.env.NODE_ENV}` });
require("./start")
  .start()
  .catch((err: Error) => {
    // tslint:disable-next-line:no-console
    console.error(`Error starting server: ${err.message}`);
    process.exit(-1);
  });
