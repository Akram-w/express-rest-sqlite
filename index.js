const express = require("express");
const app = express();
const routers = require("./controllers/controller.helper");
const port = 3000;

app.use(express.json());
app.use("/api", routers);
app.listen(port, () => {
  console.log(`Server started in ${port}`);
});
