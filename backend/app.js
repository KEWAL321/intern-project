const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const dbUrl = "mongodb://127.0.0.1:27017/todo";
const todoRoute = require("./routes/todo.js");
const todoController = require("./controllers/todo.js");
const cors = require("cors");

app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors());

app.use("/todos", todoRoute);

app.get("/", (req, res) => {
  res.send("this is root");
});

main()
  .then(() => {
    console.log("db connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.listen(port, () => {
  console.log("port 3000 currently being listened");
});
