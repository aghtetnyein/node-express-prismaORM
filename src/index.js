// express instances
const express = require("express");
const cors = require("cors");
const clc = require("cli-color");

// custom imports
const routes = require("./routes");
const PORT = process.env.PORT || 8000;

// instances
const app = express();

// middle wares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route middle wares
app.use("/", routes);

app.listen(PORT, () => {
  console.log(clc.cyanBright(`🚀 Server is running @http://localhost:${PORT}`));
});
