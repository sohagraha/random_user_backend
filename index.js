const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const toolsRoutes = require("./routes/v1/tools.route.js");
const usersRoutes = require("./routes/v1/users.route.js");
const errorHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utils/dbConnect");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express weite json file

// app.use(express.static("public"));
app.set("view engine", "ejs");

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else {
    console.log(err);
  }
});

app.use("/api/v1/tools", toolsRoutes);
app.use("/api/v1/users", usersRoutes);

app.get("/", (req, res) => {
  // res.send("Hello World");
  // res.sendFile(__dirname + "/public/test.html");
  res.render("home.ejs", {
    id: 5,
    user: {
      name: "test",
    },
  });
});

app.all("*", (req, res) => {
  res.send("NO route found.");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
