const express = require("express");
const inventoryRouter = require("./routes/inventoryRouter.js");
const path = require("node:path");
const PORT = 3000;

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(inventoryRouter);
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));



app.listen(PORT, () => {
    console.log("Server is running!");
})