const express = require("express");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// passport config
require("./config/passport")(passport);
// initialize passport
app.use(passport.initialize());
// use morgan logger
app.use(morgan("tiny"));
// use the json parser
app.use(express.json());
// use express urlencoded middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
// use the cors module
app.use(cors());

// load the routes
app.use(require("./routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// testing and learning the prisma 2 client
// async function test() {
//   const { PrismaClient } = require("@prisma/client");
//   const prisma = new PrismaClient();
//   const user = await prisma.users.findMany();
// }

// test();
